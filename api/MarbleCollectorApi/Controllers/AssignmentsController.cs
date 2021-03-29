using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.SignalR;
using MarbleCollectorApi.Hubs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace MarbleCollectorApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class AssignmentsController : Controller
    {
        private readonly IAssignmentRepository _assignmentRepository;
        private readonly IChoreRepository _choreRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<ParentNotificationHub> _parentNotificationHubContext;
        private readonly IHubContext<ChildNotificationHub> _childrenNotificationHubContext;

        public AssignmentsController(IAssignmentRepository assignmentRepository, IChoreRepository choreRepository, IUserRepository userRepository, IHubContext<ParentNotificationHub> parentNotificationHubContext, IHubContext<ChildNotificationHub> childrenNotificationHubContext)
        {
            _assignmentRepository = assignmentRepository ?? throw new ArgumentNullException(nameof(assignmentRepository));
            _choreRepository = choreRepository ?? throw new ArgumentNullException(nameof(choreRepository));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _parentNotificationHubContext = parentNotificationHubContext ?? throw new ArgumentNullException(nameof(parentNotificationHubContext));
            _childrenNotificationHubContext = childrenNotificationHubContext ?? throw new ArgumentNullException(nameof(childrenNotificationHubContext));
        }

        // TODO js (04.03.2021): Can all users get all assignments?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Assignment>> GetAssignments()
        {
            return Ok(_assignmentRepository.GetAll().Select(assignment => assignment.Map()));
        }

        // TODO js (04.03.2021): Can all users get all assignments?
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Assignment> GetAssignmentById(int id)
        {
            var assignment = _assignmentRepository.GetSingle(id);
            if (assignment == null)
            {
                return NotFound();
            }

            return Ok(assignment.Map());
        }

        [HttpPost()]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<Assignment>> CreateAssignment(Assignment assignment)
        {
            var user = _userRepository.GetSingle(assignment.UserId);
            var chore = _choreRepository.GetSingle(assignment.ChoreId);

            if (user == null || chore == null)
            {
                return NotFound();
            }

            var assignmentEntity = assignment.Map();
            assignmentEntity.User = user;
            assignmentEntity.Chore = chore;

            var entityEntry = _assignmentRepository.Add(assignmentEntity);

            try
            {
                _assignmentRepository.Commit();
            }
            catch
            {
                // TODO hs 210307, maybe add some more parameter validation?
                return BadRequest();
            }

            await _childrenNotificationHubContext.Clients.All.SendChildNotification(ChildNotification.AssignmentCreated, entityEntry.Entity.UserId, entityEntry.Entity.Id);
            //await _parentNotificationHubContext.Clients.All.SendAsync("CreatedAssignment", entityEntry.Entity.ChoreId, entityEntry.Entity.Id); // TODO js (16.03.2021): Do we need to notify the parents as well?

            return Created("Get", entityEntry.Entity.Map());
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Assignment>> UpdateAssignment(int id, Assignment assignment)
        {
            if (id != assignment.Id)
            {
                return BadRequest();
            }

            var stateChanged = CheckHasStateChanged(assignment.State, id);

            // TODO hs 210307, can a assignment be modified if the state is Archived, which is by definition the final state
            EntityEntry entityEntry = _assignmentRepository.Update(assignment.Map());
            _assignmentRepository.Commit();

            if (stateChanged)
            {
                if (assignment.State == AssignmentState.Assigned || assignment.State == AssignmentState.CheckConfirmed || assignment.State == AssignmentState.CheckRefused)
                {
                    await _childrenNotificationHubContext.Clients.All.SendChildNotification(ChildNotification.AssignmentUpdated, assignment.UserId, assignment.ChoreId);
                }
                else if (assignment.State != AssignmentState.Archived)
                {
                    await _parentNotificationHubContext.Clients.All.SendParentNotification(ParentNotification.AssignmentUpdated, assignment.UserId, assignment.ChoreId);
                }
            }

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var assignment = _assignmentRepository.GetSingle(id);
            if (assignment == null)
            {
                return NotFound();
            }

            // TODO js (04.03.2021): Can an assignment be deleted if it's already in progress?
            _assignmentRepository.Delete(assignment);
            _assignmentRepository.Commit();

            await _childrenNotificationHubContext.Clients.All.SendChildNotification(ChildNotification.AssignmentDeleted, assignment.UserId, assignment.Id);
            await _parentNotificationHubContext.Clients.All.SendParentNotification(ParentNotification.AssignmentDeleted, assignment.ChoreId, assignment.Id); // TODO js (16.03.2021): Do we need to notify the parents as well?

            return Ok();
        }

        [HttpGet("Users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<AssignmentWithChore>> GetAssignmentsForUser(int id)
        {
            var assignmentsForUser = _assignmentRepository.GetAll().Where(assignments => assignments.UserId == id).Select(assignment => assignment.Map());

            return Ok(assignmentsForUser);
        }

        private bool CheckHasStateChanged(AssignmentState newState, int id)
        {
            return (int)newState != (int)_assignmentRepository.GetSingleUntracked(id).State;
        }
    }
}
