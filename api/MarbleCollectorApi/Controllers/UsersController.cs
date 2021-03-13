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
            var users = _userRepository.GetAll()
                .Where(user => user.Family.Equals(family))
                .ToArray();

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
    }
}