using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }
        [Required]
        [StringLength(200)]
        public string Address { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string City { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string District { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string Ward { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string Country { get; set; } = null!;
     
        public string? PostalCode { get; set; }

        public User User { get; set; } = null!;

    }
}
