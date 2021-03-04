using System.ComponentModel.DataAnnotations;

namespace MarbleCollectorApi.ViewModels
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
