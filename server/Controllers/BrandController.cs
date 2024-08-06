using Backend.Config.Base;
using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("brand")]
    [ApiController]
    public class BrandController : ControllerProvider
    {
        private readonly IBrandRepository _brandRepo;

        public BrandController(IBrandRepository brandRepo)
        {
            _brandRepo = brandRepo;
        }

        // GetBrands
        [HttpGet]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _brandRepo.GetAllBrandsAsync();
            return OnSuccess(brands);
        }
        // End GetBrands

        // GetBrandById
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var brand = await _brandRepo.GetBrandByIdAsync(id);
            if (brand == null)
            {
                throw new Exception("Brand not found.");
            }
            return OnSuccess(brand);
        }
        // End GetBrandById

        // AddBrand
        [HttpPost]
        public async Task<IActionResult> AddBrand([FromBody] BrandDTO model)
        {
            if (await _brandRepo.GetBrandByNameAsync(model.Name) != null)
            {
                throw new Exception("Brand name already exists.");
            }

            var newBrand = await _brandRepo.AddBrandAsync(model);
            return OnSuccess(newBrand);
        }
        // End AddBrand

        // UpdateBrand
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(int id, [FromBody] BrandDTO model)
        {
            var updatedBrand = await _brandRepo.UpdateBrandAsync(id, model);
            if (updatedBrand == null)
            {
                throw new Exception("Brand not found or brand name already exists.");
            }
            return OnSuccess(updatedBrand);
        }
        // End UpdateBrand

        // DeleteBrand
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var deletedBrand = await _brandRepo.DeleteBrandAsync(id);
            if (deletedBrand == null)
            {
                throw new Exception("Brand not found or has associated products.");
            }
            return OnSuccess(deletedBrand);
        }
        // End DeleteBrand
    }
}
