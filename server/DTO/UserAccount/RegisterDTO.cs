using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.UserAccount
{
    public class RegisterDTO
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = null!;
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string Phone { get; set; } = null!;
       
       

    }
}
