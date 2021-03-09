using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace MarbleCollectorApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class ChoresController : Controller
    {
        private readonly IChoreRepository _choreRepository;
        private readonly IAssignmentRepository _assignmentRepository;

        public ChoresController(IChoreRepository choreRepository, IAssignmentRepository assignmentRepository)
        {
            _choreRepository = choreRepository ?? throw new ArgumentNullException(nameof(choreRepository));
            _assignmentRepository =
                assignmentRepository ?? throw new ArgumentNullException(nameof(assignmentRepository));
        }

        // TODO js (04.03.2021): Can all users get all chores?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Chore>> GetChores()
        {
            return Ok(_choreRepository.GetAll().Select(chore => chore.Map()));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Chore> GetChoreById(int id)
        {
            var chore = _choreRepository.GetSingle(id);
            if (chore == null)
            {
                return NotFound();
            }

            return Ok(chore.Map());
        }

        [HttpPost()]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public ActionResult<Chore> CreateChore(Chore chore)
        {
            if (string.IsNullOrEmpty(chore.Name) || string.IsNullOrEmpty(chore.Description))
            {
                return BadRequest();
            }

            var entityEntry = _choreRepository.Add(chore.Map());
            _choreRepository.Commit();

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Chore> UpdateChore(int id, Chore chore)
        {
            if (id != chore.Id)
            {
                return BadRequest();
            }

            // TODO js (04.03.2021): Can a chore be updated if done/confirmed assignments exist?
            EntityEntry entityEntry = _choreRepository.Update(chore.Map());
            _choreRepository.Commit();

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            var chore = _choreRepository.GetSingle(id);
            if (chore == null)
            {
                return NotFound();
            }

            // TODO js (04.03.2021): Can a chore be deleted if done/confirmed assignments exist?
            _choreRepository.Delete(chore);
            // TODO js (04.03.2021): Delete all assignments of the chore.
            _choreRepository.Commit();

            return Ok();
        }


        // TODO js (04.03.2021): Can all users get all chores?
        [HttpGet("Assignments/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<ChoreWithAssignments>> GetChoresAndAssignments()
        {
            var assignments = _assignmentRepository.GetAll();

            var choresWithAssignments = assignments.GroupBy(assignment => assignment.Chore)
                .Select(group => new ChoreWithAssignments { 
                    Id = group.Key.Id, 
                    Name = group.Key.Name,
                    Description = group.Key.Description,
                    Value = group.Key.Value,
                    DueDate = group.Key.DueDate,
                    Assignments = group.Select(assignment => assignment.Map())
                });

            return Ok(choresWithAssignments);
        }
    }
}
