using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Supplier
    {
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string SupplierName { get; set; } = null!;
        [Required]
        [StringLength(200)]
        public string Address { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string Email { get; set; } = null!;
        [Required]
        [StringLength(15)]
        public string Phone { get; set; } = null!;

        public string? Note { get; set; }

    }
}
