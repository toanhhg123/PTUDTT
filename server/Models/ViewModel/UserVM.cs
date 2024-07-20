using System.ComponentModel.DataAnnotations;

namespace Backend.Models.ViewModel
{
    public class UserVM
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
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
    }
}
