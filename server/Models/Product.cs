using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string ProductName { get; set; } = null!;

        public string? Desc { get; set; }

        public int Stock { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal PurchasePrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal SellPrice { get; set; }

        public string Image { get; set; } = null!;

        public int CategoryId { get; set; }

        public int BrandId { get; set; }

        public bool IsActive { get; set; }

        public Brand Brand { get; set; } = null!;

        public Category Category { get; set; } = null!;
        [JsonIgnore]
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();
        [JsonIgnore]
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        [JsonIgnore]
        public ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();

    }
}
