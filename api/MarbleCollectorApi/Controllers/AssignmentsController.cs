using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MarbleCollectorApi.ViewModels;

namespace MarbleCollectorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : Controller
    {
        // TODO js (04.03.2021): Can all users get all assignments?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Assignment>> GetAssignments()
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        // TODO js (04.03.2021): Can all users get all assignments?
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Assignment> GetAssignmentById(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
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
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpGet("Users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<AssignmentWithChore>> GetAssignmentsForUser(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }
    }
}
