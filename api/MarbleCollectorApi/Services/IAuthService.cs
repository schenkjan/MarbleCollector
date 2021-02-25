using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.ViewModels.Auth;

namespace MarbleCollectorApi.Services
{
    public interface IAuthService
    {
        AuthResponse GetAuthResponse(User user);
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
    }
}