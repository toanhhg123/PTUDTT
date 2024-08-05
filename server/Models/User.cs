using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
  public class User
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = null!;
    [Required]
    [StringLength(100)]
    public string Username { get; set; } = null!;
    [Required]
    [StringLength(100)]
    public string Password { get; set; } = null!;
    [Required]
    [StringLength(50)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(10)]
    public string Phone { get; set; } = null!;
    [Required]
    public string Role { get; set; } = "User"; // default Value = user
    public DateTime? CreateAt { get; set; }

    public DateTime? ModifiedAt { get; set; }
    [Required]
    public bool IsActive { get; set; }

    public ICollection<UserAddress> UsersAddress { get; set; } = new List<UserAddress>();
    public ICollection<Cart> Carts { get; set; } = new List<Cart>();

    [JsonIgnore]
    public ICollection<Order> Orders { get; set; } = new List<Order>();


    public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; } = new List<PurchaseOrder>();
  }
}
