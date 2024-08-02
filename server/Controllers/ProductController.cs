﻿using Backend.Config.Base;
using Backend.DTO;
using Backend.DTO.Product;
using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("product")]
    [ApiController]
    public class ProductController : ControllerProvider
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepo.GetAllProductsAsync();
            return OnSuccess(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                return OnError<ProductDTO>("Product not found.");
            }
            return OnSuccess(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductDTO model)
        {
            var newProduct = await _productRepo.AddProductAsync(model);
            return OnSuccess(newProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDTO model)
        {
            var updatedProduct = await _productRepo.UpdateProductAsync(id, model);
            if (updatedProduct == null)
            {
                return OnError<ProductDTO>("Product not found or duplicate name.");
            }
            return OnSuccess(updatedProduct);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deletedProduct = await _productRepo.DeleteProductAsync(id);
            if (deletedProduct == null)
            {
                return OnError<ProductDTO>("Product not found.");
            }
            return OnSuccess(deletedProduct);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredProducts([FromQuery] ProductFilterDTO filter)
        {
            var products = await _productRepo.GetFilteredProductsAsync(filter);

            if (products == null || !products.Any())
            {
                return this.OnError<IEnumerable<ProductDTO>>("No products found matching the criteria.");
            }

            return this.OnSuccess(products);
        }
    }
}
