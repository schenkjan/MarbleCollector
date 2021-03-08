using MarbleCollectorApi.Data.Models.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; }
        public string Family { get; set; }
        public ICollection<Assignment> Assignements { get; set; }
        public ICollection<Grant> Grants { get; set; }
    }
}
