using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
  public class RecommentProduct
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int CurrentProductId { get; set; }

    [Required]
    public int RecommentProductId { get; set; }

    [ForeignKey("RecommentProductId")]
    public Product RecommendProduct { get; set; } = null!;



  }
}
