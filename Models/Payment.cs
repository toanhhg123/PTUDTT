using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public DateTime DateOfPayment { get; set; }

    public decimal Amount { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
