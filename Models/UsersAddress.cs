using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UsersAddress
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string District { get; set; } = null!;

    public string Ward { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string? PostalCode { get; set; }

    public virtual User User { get; set; } = null!;
}
