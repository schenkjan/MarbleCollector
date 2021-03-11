using System;
using System.Collections.Generic;
using MarbleCollectorApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.Authorization;

namespace MarbleCollectorApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class RewardsController : Controller
    {
        private readonly IRewardRepository _rewardRepository;
        private readonly IGrantRepository _grantRepository;

        public RewardsController(IRewardRepository rewardRepository, IGrantRepository grantRepository)
        {
            _rewardRepository =
                rewardRepository ?? throw new ArgumentNullException(nameof(rewardRepository));
            _grantRepository = grantRepository ?? throw new ArgumentNullException(nameof(grantRepository));
        }

        // TODO js (04.03.2021): Can all users get all rewards?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Reward>> GetRewards()
        {
            return Ok(_rewardRepository.GetAll().Select(reward => reward.Map()));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Reward> GetRewardById(int id)
        {
            var reward = _rewardRepository.GetSingle(id);
            if (reward == null)
            {
                return NotFound();
            }

            return Ok(reward.Map());
        }

        [HttpPost()]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public ActionResult<Reward> CreateReward(Reward reward)
        {
            if (string.IsNullOrEmpty(reward.Name) || string.IsNullOrEmpty(reward.Description))
            {
                return BadRequest();
            }

            var entityEntry = _rewardRepository.Add(reward.Map());
            _rewardRepository.Commit();

            return Created("Get", entityEntry.Entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Reward> UpdateReward(int id, Reward reward)
        {
            if (id != reward.Id)
            {
                return BadRequest();
            }

            // TODO hs 210307: Can a reward be updated if a grant already exists?
            EntityEntry entityEntry = _rewardRepository.Update(reward.Map());
            _rewardRepository.Commit();

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            var reward = _rewardRepository.GetSingle(id);
            if (reward == null)
            {
                return NotFound();
            }

            // TODO hs 210307: Can a reward be deleted if a grant already exists?
            _rewardRepository.Delete(reward);
            _rewardRepository.Commit();

            return Ok();
        }

        // TODO js (04.03.2021): Can all users get all rewards?
        [HttpGet("Grants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<RewardWithGrants>> GetRewardsAndGrants()
        {
            var grants = _grantRepository.GetAll();

            var rewardsWithGrants = grants.GroupBy(grant => grant.Reward)
                .Select(group => new RewardWithGrants
                {
                    Id = group.Key.Id,
                    Name = group.Key.Name,
                    Description = group.Key.Description,
                    Value = group.Key.Value,
                    Grants = group.Select(grant => grant.Map())
                }).ToList();

            // Handle rewards with no grant yet.
            var rewardIds = rewardsWithGrants.Select(reward => reward.Id).ToArray();
            var rewardsWithNoGrants = _rewardRepository.GetAll().Where(reward => !rewardIds.Contains(reward.Id));
            rewardsWithGrants.AddRange(rewardsWithNoGrants.Select(reward => new RewardWithGrants
            {
                Id = reward.Id,
                Name = reward.Name,
                Description = reward.Description,
                Value = reward.Value,
                Grants = Array.Empty<Grant>()
            }));

            return Ok(rewardsWithGrants.OrderBy(reward => reward.Id));
        }
    }
}