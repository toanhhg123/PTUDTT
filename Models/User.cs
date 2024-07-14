using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
  public class User
  {
    public int Id { get; private set; }
    public string Name { get; set; } = String.Empty;
    public string Email { get; set; } = string.Empty;
  }
}
