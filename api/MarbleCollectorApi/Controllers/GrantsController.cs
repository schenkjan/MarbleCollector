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
    public class GrantsController : Controller
    {
        private readonly IGrantRepository _grantRepository;

        public GrantsController(IGrantRepository grantRepository)
        {
            _grantRepository = grantRepository ?? throw new ArgumentNullException(nameof(grantRepository));
        }

        // TODO js (04.03.2021): Can all users get all grants?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Grant>> GetGrants()
        {
            return Ok(_grantRepository.GetAll().Select(grant => grant.Map()));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Grant> GetGrantById(int id)
        {
            var grant = _grantRepository.GetSingle(id);
            if (grant == null)
            {
                return NotFound();
            }

            return Ok(grant.Map());
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
            var grant = _grantRepository.GetSingle(id);
            if (grant == null)
            {
                return NotFound();
            }

            // TODO js (04.03.2021): Can a grant be deleted if it's already in progress?
            _grantRepository.Delete(grant);

            _grantRepository.Commit();

            return Ok();
        }

        [HttpGet("Users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<GrantWithReward>> GetGrantsForUser(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }
    }
}
