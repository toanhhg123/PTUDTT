﻿using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<Product> AddProductAsync(ProductDTO model);
        Task<Product?> UpdateProductAsync(int id, ProductDTO model);
        Task<Product?> DeleteProductAsync(int id);
    }
}