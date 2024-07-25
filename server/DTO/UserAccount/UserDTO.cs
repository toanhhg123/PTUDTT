using System.ComponentModel.DataAnnotations;

namespace Backend.Models.ViewModel
{
    public class UserDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; } = null!;
        [Required]
        
        public string Username { get; set; } = null!;
        [DataType(DataType.Password), Required]
        public string Password { get; set; } = null!;
        [Required, MaxLength(10)]
        public string Phone { get; set; } = null!;
        [Required]
        public string Role { get; set; } = "User";
        public bool IsActive { get; set; }
    }
}
