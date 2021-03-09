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

        // TODO js (04.03.2021): Remove mock data as soon as the database and repository are ready.
        private readonly ChoreWithAssignments[] _chores =
        {
            new ChoreWithAssignments
            {
                Id = 1, Name = "Abwaschen", Description = "Bis sauber", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 1, UserId = 1, UserName = "Lara", ChoreId = 1, State = AssignmentState.Assigned},
                    new Assignment {Id = 2, UserId = 2, UserName = "Lisa", ChoreId = 1, State = AssignmentState.Active},
                    new Assignment {Id = 3, UserId = 3, UserName = "Lars", ChoreId = 1, State = AssignmentState.RequestedToCheck},
                }
            },
            new ChoreWithAssignments
            {
                Id = 2, Name = "Zimmer aufräumen", Description = "Bis tip top", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 4, UserId = 1, UserName = "Lara", ChoreId = 2, State = AssignmentState.CheckConfirmed},
                    new Assignment {Id = 5, UserId = 2, UserName = "Lisa", ChoreId = 2, State = AssignmentState.CheckRefused},
                    new Assignment {Id = 6, UserId = 3, UserName = "Lars", ChoreId = 2, State = AssignmentState.Archived},
                }
            },
            new ChoreWithAssignments
            {
                Id = 3, Name = "Rasen mähen", Description = "Ganzer Garten", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 7, UserId = 1, UserName = "Lara", ChoreId = 3, State = AssignmentState.RequestedToCheck},
                    new Assignment {Id = 8, UserId = 2, UserName = "Lisa", ChoreId = 3, State = AssignmentState.CheckConfirmed},
                }
            },
            new ChoreWithAssignments
            {
                Id = 4, Name = "Tisch abräumen", Description = "Alles Geschirr und Besteck", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 9, UserId = 1, UserName = "Lara", ChoreId = 4, State = AssignmentState.CheckConfirmed},
                }
            },
            new ChoreWithAssignments
            {
                Id = 5, Name = "Abwaschen", Description = "Bis sauber", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 10, UserId = 1, UserName = "Lara", ChoreId = 5, State = AssignmentState.Assigned},
                    new Assignment {Id = 11, UserId = 2, UserName = "Lisa", ChoreId = 5, State = AssignmentState.Active},
                    new Assignment {Id = 12, UserId = 3, UserName = "Lars", ChoreId = 5, State = AssignmentState.RequestedToCheck},
                }
            },
            new ChoreWithAssignments
            {
                Id = 6, Name = "Zimmer Staub saugen", Description = "Bis tip top", DueDate = DateTime.Today.AddDays(1), Value = 10,
                Assignments = new List<Assignment>
                {
                    new Assignment {Id = 13, UserId = 1, UserName = "Lara", ChoreId = 6, State = AssignmentState.CheckConfirmed},
                    new Assignment {Id = 14, UserId = 2, UserName = "Lisa", ChoreId = 6, State = AssignmentState.CheckRefused},
                    new Assignment {Id = 15, UserId = 3, UserName = "Lars", ChoreId = 6, State = AssignmentState.Archived},
                }
            },
        };

        // TODO js (04.03.2021): Can all users get all chores?
        [HttpGet("Assignments/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<ChoreWithAssignments>> GetChoresAndAssignments()
        {
            // TODO js (04.03.2021): Get data via repositories as soon as the database and repositories are ready.

            return Ok(_chores);
        }
    }
}
