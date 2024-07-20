using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = null!;

    public string? Desc { get; set; }

    public int Stock { get; set; }

    public decimal PurchasePrice { get; set; }

    public decimal SellPrice { get; set; }

    public string Image { get; set; } = null!;

    public int CategoryId { get; set; }

    public int BrandId { get; set; }

    public bool IsActive { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();
}
