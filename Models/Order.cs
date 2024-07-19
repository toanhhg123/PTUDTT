using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal TotalPrice { get; set; }

    public int PaymentId { get; set; }

    public DateTime OrderDate { get; set; }

    public DateTime DeliveryDate { get; set; }

    public string? Note { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Payment Payment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
