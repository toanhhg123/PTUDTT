using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IRecommentProductRepository
    {
        Task<IEnumerable<RecommentProduct>> GetRecommentProductsAsync(int productId);
    }
}
