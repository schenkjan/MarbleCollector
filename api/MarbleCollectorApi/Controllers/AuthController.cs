using Microsoft.AspNetCore.Mvc;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using MarbleCollectorApi.ViewModels.Auth;
using MarbleCollectorApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace MarbleCollectorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;

        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Logs in the user and returns an access token
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /auth/login
        ///     {
        ///        "username": "peter",
        ///        "password": "123456"
        ///     }
        ///
        /// </remarks>
        /// <returns>An object with token and basic user info.</returns>
        /// <response code="200">Returns basic user info and an access token</response>
        /// <response code="400">The username or password is incorrect. See response body</response>
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<AuthResponse> Post([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userRepository.GetUser(model.Username);

            if (user == null)
            {
                return BadRequest(new { username = "no user with this username" });
            }

            var passwordValid = _authService.VerifyPassword(model.Password, user.Password);
            if (!passwordValid)
            {
                return BadRequest(new { password = "invalid password" });
            }

            return Ok(_authService.GetAuthResponse(user));
        }

        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<AuthResponse> Post()
        {
            // Perform whatever
            return Ok();
        }
    }
}
