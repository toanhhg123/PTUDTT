using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category?> GetCategoryByIdAsync(int id);
        Task<Category?> GetCategoryByNameAsync(string name);
        Task<Category> AddCategoryAsync(CategoryDTO model);
        Task<Category?> UpdateCategoryAsync(int id, CategoryDTO model);
        Task<Category?> DeleteCategoryAsync(int id);
    }
}
