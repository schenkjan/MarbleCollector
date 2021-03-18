using System;
using System.Collections.Generic;
using System.Linq;
using MarbleCollectorApi.Data.Mapping;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarbleCollectorApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        // TODO js (13.03.2021): Can all users get all users?
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_userRepository.GetAll().Select(user => user.Map()));
        }

        // TODO js (13.03.2021): Can all users get all users?
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> GetUser(int id)
        {
            var user = _userRepository.GetSingle(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // TODO js (13.03.2021): Can all users get all users?
        [HttpGet("{id}/profile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserProfile> GetUserProfile(int id)
        {
            var user = _userRepository.GetSingle(id);

            if (user == null)
            {
                return NotFound();
            }

            var usersForFamily = GetUsersForFamily(user.Family);
            var userProfile = new UserProfile
            {
                User = user.Map(),
                Family = usersForFamily.Select(u => u.Map()),
                Score = new UserScore()
            };

            return Ok(userProfile);
        }

        // TODO js (13.03.2021): Can all users get all families?
        [HttpGet("families")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<string>> GetFamilies()
        {
            return Ok(_userRepository.GetAll()
                .Select(user => user.Family)
                .Distinct());
        }

        // TODO js (13.03.2021): Can all users get all users?
        [HttpGet("families/{family}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<User>> GetUsers(string family, [FromQuery] string role)
        {
            var users = GetUsersForFamily(family);
            if (!string.IsNullOrEmpty(role))
            {
                users = users.Where(user => user.Role.Equals(role)).ToArray();
            }

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users.Select(user => user.Map()));
        }

        protected IEnumerable<Data.Models.User> GetUsersForFamily(string family)
        {
            return _userRepository.GetAll()
                .Where(user => user.Family.Equals(family))
                .ToArray();
        }
    }
}