using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MarbleCollectorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : Controller
    {
        private readonly IAssignmentRepository _assignmentRepository;

        public AssignmentsController(IAssignmentRepository assignmentRepository)
        {
            _assignmentRepository =
                assignmentRepository ?? throw new ArgumentNullException(nameof(assignmentRepository));
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
        //[Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public ActionResult<Assignment> CreateAssignment(Assignment assignment)
        {
            var entityEntry = _assignmentRepository.Add(assignment.Map());

            try
            {
                _assignmentRepository.Commit();
            }
            catch
            {
                // TODO hs 210307, is i.e. foreign key constraint a bad request or internal server error?
                // TODO hs 210307, maybe add some more parameter validation?
                return BadRequest(); ;
            }

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Assignment> UpdateAssignment(int id, Assignment assignment)
        {
            if (id != assignment.Id)
            {
                return BadRequest();
            }

            // TODO hs 210307, can a assignment be modified if the state is Archived, which is by defintion the final state
            EntityEntry entityEntry = _assignmentRepository.Update(assignment.Map());
            _assignmentRepository.Commit();

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            var assignment = _assignmentRepository.GetSingle(id);
            if (assignment == null)
            {
                return NotFound();
            }

            // TODO js (04.03.2021): Can an assignment be deleted if it's already in progress?
            _assignmentRepository.Delete(assignment);
            _assignmentRepository.Commit();

            return Ok();
        }

        [HttpGet("Users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<AssignmentWithChore>> GetAssignmentsForUser(int id)
        {
            var assignmentsForUser = _assignmentRepository.GetAll().Where(assignments => assignments.UserId == id).Select(assignment => assignment.Map());

            return Ok(assignmentsForUser);
        }
    }
}
