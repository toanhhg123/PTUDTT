using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class SupplierDTO
    {
        [Required]
        public string SupplierName { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string Phone { get; set; } = null!;
        public string? Note { get; set; }
    }
}
