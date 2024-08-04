using Backend.Config.Base;
using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("category")]
    [ApiController]
    public class CategoryController : ControllerProvider
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }
        // Get all categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryRepo.GetAllCategoriesAsync();
            return this.OnSuccess(categories);
        }

        // Get category by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryRepo.GetCategoryByIdAsync(id);
            if (category == null)
            {
                throw new Exception("Category not found.");
            }

            return this.OnSuccess(category);
        }

        // Add a new category
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDTO model)
        {
            if (await _categoryRepo.GetCategoryByNameAsync(model.Name) != null)
            {
                throw new Exception("Category name already exists.");
            }

            var newCategory = await _categoryRepo.AddCategoryAsync(model);
            return this.OnSuccess(newCategory);
        }
    

        // Update an existing category
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDTO model)
        {
            var updatedCategory = await _categoryRepo.UpdateCategoryAsync(id, model);
            if (updatedCategory == null)
            {
                throw new Exception("Category not found or brand name already exists.");
            }

            return this.OnSuccess(updatedCategory);
        }

        // Delete a category
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var deletedCategory = await _categoryRepo.DeleteCategoryAsync(id);
            if (deletedCategory == null)
            {
                throw new Exception("Category not found or unable to delete.");
            }

            return this.OnSuccess(deletedCategory);
        }
        
    }
}
