using Backend.Models.ViewModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
  public class UserAddressDTO
  {
    public int UserId { get; set; }
    public string Address { get; set; } = null!;
    public string City { get; set; } = null!;
    public string District { get; set; } = null!;
    public string Ward { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string? PostalCode { get; set; }
  }
}
