using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PurchaseOrder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int SupplierId { get; set; }

        public int UserId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        public DateTime CreateAt { get; set; }

        public string? Note { get; set; }

        public virtual Supplier Supplier { get; set; } = null!;

        public virtual User User { get; set; } = null!;
        //public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();

    }
}
