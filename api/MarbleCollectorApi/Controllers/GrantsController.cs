using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MarbleCollectorApi.ViewModels;

namespace MarbleCollectorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantsController : Controller
    {
        // TODO js (04.03.2021): Can all users get all grants?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Grant>> GetGrants()
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Grant> GetGrantById(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Grant> CreateGrant(Grant grant)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Grant> UpdateGrant(int id, Grant grant)
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
        public ActionResult<IEnumerable<GrantWithReward>> GetGrantsForUser(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }
    }
}
