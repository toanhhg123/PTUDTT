using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IBrandRepository
    {
        Task<IEnumerable<Brand>> GetAllBrandsAsync();
        Task<Brand?> GetBrandByIdAsync(int id);
        Task<Brand?> GetBrandByNameAsync(string name);
        Task<Brand> AddBrandAsync(BrandDTO model);
        Task<Brand?> UpdateBrandAsync(int id, BrandDTO model);
        Task<Brand?> DeleteBrandAsync(int id);
    }
}
