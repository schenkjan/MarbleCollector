using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;

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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Assignment> CreateAssignment(Assignment assignment)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Assignment> UpdateAssignment(int id, Assignment assignment)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
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
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<AssignmentWithChore>> GetAssignmentsForUser(int id)
        {
            var assignments = _assignmentRepository.GetAll();

            var assignmentsForUser = assignments.Where(assignments => assignments.UserId == id).Select(assignment => assignment.Map());

            if (assignmentsForUser == null)
            {
                return NotFound();
            }

            return Ok(assignmentsForUser);
        }
    }
}
