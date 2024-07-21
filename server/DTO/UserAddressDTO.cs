using Backend.Models.ViewModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class UserAddressDTO
    {
        public int UserId { get; set; }
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string District { get; set; } = null!;
        [Required]
        public string Ward { get; set; } = null!;
        [Required]
        public string Country { get; set; } = null!;
        public string? PostalCode { get; set; }
        public UserDTO User { get; set; } = null!;
    }
}
