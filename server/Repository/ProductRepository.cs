using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> AddProductAsync(ProductDTO model)
        {
            var newProduct = new Product
            {
                ProductName = model.ProductName,
                Desc = model.Desc,
                Stock = model.Stock,
                PurchasePrice = model.PurchasePrice,
                SellPrice = model.SellPrice,
                Image = model.Image,
                CategoryId = model.CategoryId,
                BrandId = model.BrandId,
                IsActive = model.IsActive
            };

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            return newProduct;
        }

        public async Task<Product?> UpdateProductAsync(int id, ProductDTO model)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return null;
            }

            product.ProductName = model.ProductName;
            product.Desc = model.Desc;
            product.Stock = model.Stock;
            product.PurchasePrice = model.PurchasePrice;
            product.SellPrice = model.SellPrice;
            product.Image = model.Image;
            product.CategoryId = model.CategoryId;
            product.BrandId = model.BrandId;
            product.IsActive = model.IsActive;

            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
