using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class OrderDetail
    {
       
        public int OrderId { get; set; }

      
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [ForeignKey("OrderId")]
        public Order Order { get; set; } = null!;

        [ForeignKey("ProductId")]
        public Product Product { get; set; } = null!;

    }
}
