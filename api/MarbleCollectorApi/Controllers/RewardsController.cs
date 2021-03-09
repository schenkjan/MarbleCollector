using System;
using System.Collections.Generic;
using MarbleCollectorApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarbleCollectorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RewardsController : Controller
    {
        // TODO js (04.03.2021): Can all users get all rewards?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Reward>> GetRewards()
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Reward> GetRewardById(int id)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Reward> CreateReward(Reward reward)
        {
            return NotFound(); // TODO js (04.03.2021): To be implemented!
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Reward> UpdateReward(int id, Reward reward)
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
    }
}