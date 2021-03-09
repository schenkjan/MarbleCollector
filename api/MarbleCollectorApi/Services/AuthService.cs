using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MarbleCollectorApi.Config;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.ViewModels.Auth;
using Microsoft.IdentityModel.Tokens;

namespace MarbleCollectorApi.Services
{
    public class AuthService : IAuthService
    {

        protected readonly AuthenticationConfigSection AuthenticationConfig;

        public AuthService(AuthenticationConfigSection configuration)
        {
            AuthenticationConfig = configuration;
        }

        public AuthResponse GetAuthResponse(User user)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(AuthenticationConfig.TokenLifespan);
            var tokenSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthenticationConfig.TokenSecret));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(tokenSigningKey, SecurityAlgorithms.HmacSha256Signature),
                Issuer = AuthenticationConfig.TokenIssuer,
                Audience = AuthenticationConfig.TokenAudience
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new AuthResponse
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Avatar = user.Avatar,
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
            };
        }

        public string HashPassword(string password)
        {
            throw new NotImplementedException();
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return actualPassword == hashedPassword;
        }
    }
}
