using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MarbleCollectorApi.Data.Repository;

namespace MarbleCollectorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChoresController : Controller
    {
        private readonly IChoreRepository _choreRepository;

        public ChoresController(IChoreRepository choreRepository)
        {
            _choreRepository = choreRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Chore>> GetChores()
        {
            return Ok(_choreRepository.GetAll());
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

            return Ok(chore);
        }


        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Chore> CreateChore(Chore chore)
        {
            if (string.IsNullOrEmpty(chore.Name) || string.IsNullOrEmpty(chore.Description))
            {
                return BadRequest();
            }

            var entityEntry = _choreRepository.Add(chore);
            _choreRepository.Commit();

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Chore> UpdateChore(int id, Chore chore)
        {
            EntityEntry entityEntry;
            if (id != chore.Id)
            {
                return BadRequest();
            }

            entityEntry = _choreRepository.Update(chore);
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

            _choreRepository.Delete(chore);
            _choreRepository.Commit();

            return Ok();
        }
    }
}
