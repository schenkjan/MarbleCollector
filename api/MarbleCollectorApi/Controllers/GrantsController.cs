using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.SignalR;
using MarbleCollectorApi.Hubs;
using Microsoft.AspNetCore.Authorization;

namespace MarbleCollectorApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class GrantsController : Controller
    {
        private readonly IGrantRepository _grantRepository;
        private readonly IRewardRepository _rewardRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<ParentNotificationHub> _parentNotificationHubContext;
        private readonly IHubContext<ChildNotificationHub> _childrenNotificationHubContext;

        public GrantsController(IGrantRepository grantRepository, IRewardRepository rewardRepository, IUserRepository userRepository, IHubContext<ParentNotificationHub> parentNotificationHubContext, IHubContext<ChildNotificationHub> childrenNotificationHubContext)
        {
            _grantRepository = grantRepository ?? throw new ArgumentNullException(nameof(grantRepository));
            _rewardRepository = rewardRepository ?? throw new ArgumentNullException(nameof(rewardRepository));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _parentNotificationHubContext = parentNotificationHubContext;
            _childrenNotificationHubContext = childrenNotificationHubContext;
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
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<Grant>> CreateGrant(Grant grant)
        {
            var user = _userRepository.GetSingle(grant.UserId);
            var reward = _rewardRepository.GetSingle(grant.RewardId);

            if (user == null || reward == null)
            {
                return NotFound();
            }

            var grantEntity = grant.Map();
            grantEntity.User = user;
            grantEntity.Reward = reward;

            var entityEntry = _grantRepository.Add(grantEntity);

            try
            {
                _grantRepository.Commit();
            }
            catch
            {
                return BadRequest(); ;
            }

            await _childrenNotificationHubContext.Clients.All.SendAsync("CreatedGrant", grant.UserId, grant.Id);

            await _parentNotificationHubContext.Clients.All.SendAsync("CreatedGrant", grant.RewardId, grant.Id); // TODO js (16.03.2021): Do we need to notify the parents as well?

            return Created("Get", entityEntry.Entity.Map());
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async System.Threading.Tasks.Task<ActionResult<Grant>> UpdateGrantAsync(int id, Grant grant)
        {
            if (id != grant.Id)
            {
                return BadRequest();
            }

            var stateChanged = CheckHasStateChanged(grant.State, id);

            // TODO hs 210307, can a grant be modified if the state is Archived, which is by defintion the final state
            EntityEntry entityEntry = _grantRepository.Update(grant.Map());
            _grantRepository.Commit();

            if (stateChanged)
            {
                if (grant.State == GrantState.Assigned || grant.State == GrantState.RequestConfirmed)
                {
                    await _childrenNotificationHubContext.Clients.All.SendAsync("UpdateGrants", grant.UserId, grant.RewardId);
                }
                else if (grant.State != GrantState.Archived)
                {
                    await _parentNotificationHubContext.Clients.All.SendAsync("UpdateGrants", grant.UserId, grant.RewardId);
                }
            }

            return Ok(entityEntry.Entity);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Const.UserRoleParent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
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

        private bool CheckHasStateChanged(GrantState newState, int id)
        {
            return (int)newState != (int)_grantRepository.GetSingleUntracked(id).State;
        }
    }
}
