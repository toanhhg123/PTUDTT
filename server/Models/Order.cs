using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime DeliveryDate { get; set; }

        public string? Note { get; set; }

        public string Status { get; set; } = null!;
        public User User { get; set; } = null!;
        public Payment Payment { get; set; } = null!;

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    }
}
