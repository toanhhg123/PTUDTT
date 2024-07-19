using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PurchaseOrderDetail
{
    public int PurchaseOrderId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual PurchaseOrder PurchaseOrder { get; set; } = null!;
}
