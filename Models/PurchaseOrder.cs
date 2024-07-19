using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PurchaseOrder
{
    public int Id { get; set; }

    public int SupplierId { get; set; }

    public int UserId { get; set; }

    public decimal TotalPrice { get; set; }

    public DateTime CreateAt { get; set; }

    public string? Note { get; set; }

    public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();

    public virtual Supplier Supplier { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
