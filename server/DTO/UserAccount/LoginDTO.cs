using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.UserAccount
{
    public class LoginDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
