using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PurchaseOrderDetail
    {
        public int PurchaseOrderId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [ForeignKey("PurchaseOrderId")]
        public PurchaseOrder PurchaseOrder { get; set; } = null!;

        [ForeignKey("ProductId")]
        public Product Product { get; set; } = null!;

    }
}
