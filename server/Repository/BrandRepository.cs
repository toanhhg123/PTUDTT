using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly AppDbContext _context;

        public BrandRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand?> GetBrandByIdAsync(int id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public async Task<Brand?> GetBrandByNameAsync(string name)
        {
            return await _context.Brands.FirstOrDefaultAsync(b => b.Name == name);
        }

        public async Task<Brand> AddBrandAsync(BrandDTO model)
        {
            var newBrand = new Brand
            {
                Name = model.Name,
                Note = model.Note
            };

            _context.Brands.Add(newBrand);
            await _context.SaveChangesAsync();

            return newBrand;
        }

        public async Task<Brand?> UpdateBrandAsync(int id, BrandDTO model)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return null;
            }

            if (await _context.Brands.AnyAsync(b => b.Name == model.Name && b.Id != id))
            {
                return null;
            }

            brand.Name = model.Name;
            brand.Note = model.Note;

            _context.Brands.Update(brand);
            await _context.SaveChangesAsync();

            return brand;
        }

        public async Task<Brand?> DeleteBrandAsync(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return null;
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return brand;
        }
    }
}
