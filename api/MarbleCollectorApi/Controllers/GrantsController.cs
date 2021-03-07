using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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
            var entityEntry = _grantRepository.Add(grant.Map());

            try
            {
                _grantRepository.Commit();
            }
            catch
            {
                // TODO hs 210307, is i.e. foreign key constraint a bad request or internal server error?
                return BadRequest(); ;
            }

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Grant> UpdateGrant(int id, Grant grant)
        {
            if (id != grant.Id)
            {
                return BadRequest();
            }

            // TODO hs 210307, can a grant be modified if the state is Archived, which is by defintion the final state
            EntityEntry entityEntry = _grantRepository.Update(grant.Map());
            _grantRepository.Commit();

            return Ok(entityEntry.Entity);
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
            var grantForUser = _grantRepository.GetAll().Where(grants => grants.UserId == id).Select(grants => grants.Map());

            return Ok(grantForUser);
        }
    }
}
