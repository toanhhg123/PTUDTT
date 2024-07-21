using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class BrandDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        public string? Note { get; set; }
    }
}
