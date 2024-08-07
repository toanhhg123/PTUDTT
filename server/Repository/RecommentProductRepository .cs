using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
  public class RecommentProductRepository : IRecommentProductRepository
  {
    private readonly AppDbContext _context;

    public RecommentProductRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<IEnumerable<RecommentProduct>> GetRecommentProductsAsync(int productId)
    {
      return await _context.RecommentProducts
          .Where(rp => rp.CurrentProductId == productId)
          .Include(rp => rp.RecommendProduct)  // Include the Product entity
          .ToListAsync();
    }
  }
}
