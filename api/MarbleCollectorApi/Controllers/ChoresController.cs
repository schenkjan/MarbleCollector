using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MarbleCollectorApi.Data;
using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MarbleCollectorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChoresController : Controller
    {
        private readonly MarbleCollectorDbContext _context;

        public ChoresController(MarbleCollectorDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Chore>>> GetChores()
        {
            return Ok(await _context.Chores.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chore>> GetChoreById(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var chore = await _context.Chores
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chore == null)
            {
                return NotFound();
            }

            return Ok(chore);
        }


        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Chore>> CreateChore(Chore chore)
        {
            if (string.IsNullOrEmpty(chore.Name) || string.IsNullOrEmpty(chore.Description))
            {
                return BadRequest();
            }

            var entityEntry = _context.Add(chore);
            await _context.SaveChangesAsync();

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chore>> UpdateChore(int? id, Chore chore)
        {
            EntityEntry entityEntry;
            if (id != chore.Id)
            {
                return NotFound();
            }

            entityEntry = _context.Update(chore);
            await _context.SaveChangesAsync();

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var chore = await _context.Chores
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chore == null)
            {
                return NotFound();
            }

            _context.Chores.Remove(chore);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
