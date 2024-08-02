using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class ProductDTO
    {
        [Required]
        public string ProductName { get; set; } = null!;
        public string? Desc { get; set; }
        [Required]
        public int Stock { get; set; }
        [Required]
        public decimal PurchasePrice { get; set; }
        [Required]
        public decimal SellPrice { get; set; }
        [Required]
        public string Image { get; set; } = null!;
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public bool IsActive { get; set; }
    }
}
