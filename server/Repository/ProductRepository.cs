using Backend.DTO;
using Backend.DTO.Product;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Data;
using server.DTO;

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
      // Tìm kiếm sản phẩm theo id
      var product = await _context.Products
          .Include(p => p.Carts)
          .Include(p => p.OrderDetails)
          .FirstOrDefaultAsync(p => p.Id == id);

      // Kiểm tra nếu sản phẩm không tồn tại hoặc có dữ liệu liên quan
      if (product == null ||
          product.Carts.Any() ||
          product.OrderDetails.Any())
      {
        return null; // Không xóa nếu có liên kết dữ liệu hoặc không tìm thấy sản phẩm
      }

      // Xóa sản phẩm
      _context.Products.Remove(product);
      await _context.SaveChangesAsync();

      return product;
    }

    public async Task<IEnumerable<ProductDTO>> GetFilteredProductsAsync(ProductFilterDTO filter)
    {
      var query = _context.Products.AsQueryable();

      if (filter.MinPrice.HasValue)
      {
        query = query.Where(p => p.SellPrice >= filter.MinPrice.Value);
      }

      if (filter.MaxPrice.HasValue)
      {
        query = query.Where(p => p.SellPrice <= filter.MaxPrice.Value);
      }

      if (!string.IsNullOrEmpty(filter.SizeInch))
      {
        query = query.Where(p => p.ProductName.ToLower().Contains(filter.SizeInch.ToLower()));
      }

      if (!string.IsNullOrEmpty(filter.Color))
      {
        query = query.Where(p => p.ProductName.ToLower().Contains(filter.Color.ToLower()));
      }

      var products = await query.ToListAsync();

      // Trả về danh sách sản phẩm nếu tìm thấy
      if (products.Any())
      {
        return products.Select(p => new ProductDTO
        {
          ProductName = p.ProductName,
          Desc = p.Desc,
          Stock = p.Stock,
          PurchasePrice = p.PurchasePrice,
          SellPrice = p.SellPrice,
          Image = p.Image,
          CategoryId = p.CategoryId,
          BrandId = p.BrandId,
          IsActive = p.IsActive
        }).ToList();
      }

      // Trả về null nếu không tìm thấy sản phẩm
      return null;
    }


    public void TrendModel()
    {
      var products = _context.Products.ToList();
      var mlContext = new MLContext();

      var data = products.Select(p => new ProductSimilarity
      {
        Id = p.Id,
        CombinedFeatures = $"{p.ProductName} {p.Desc}"
      }).ToList();

      var dataView = mlContext.Data.LoadFromEnumerable(data);

      var pipeline = mlContext.Transforms.Text.FeaturizeText(
                  outputColumnName: "Features",
                  inputColumnName: "CombinedFeatures")
                  .Append(mlContext.Transforms.NormalizeMinMax("Features"));

      var model = pipeline.Fit(dataView);

      var transformedData = model.Transform(dataView);

      var features = mlContext.Data.CreateEnumerable<ProductFeatures>(
          transformedData, reuseRowObject: false).ToList();

      // Function to calculate cosine similarity
      Func<float[], float[], double> cosineSimilarity = (a, b) =>
      {
        var dotProduct = a.Zip(b, (x, y) => x * y).Sum();
        var magnitudeA = Math.Sqrt(a.Sum(x => x * x));
        var magnitudeB = Math.Sqrt(b.Sum(x => x * x));
        return dotProduct / (magnitudeA * magnitudeB);
      };

      // Function to recommend products
      Func<int, int, List<Product>> recommendProducts = (productId, topN) =>
      {
        var productFeatures = features.First(f => f.Id == productId).Features;

        var similarities = features.Select(f => new
        {
          Product = products.First(p => p.Id == f.Id),
          Similarity = cosineSimilarity(productFeatures, f.Features)
        })
          .OrderByDescending(x => x.Similarity)
          .Skip(1)  // Skip the product itself
          .Take(topN)
          .Select(x => x.Product)
          .ToList();

        return similarities;
      };


      products.ForEach(p =>
      {
        var recommendedProducts = recommendProducts(p.Id, 8);
        var oldProduct = _context.RecommentProducts.Where(x => x.CurrentProductId.Equals(p.Id)).ToList();

        _context.RecommentProducts.RemoveRange(oldProduct);
        _context.SaveChanges();

        foreach (var rProduct in recommendedProducts)
        {
          Console.WriteLine($"PID: ${p.Id} ==> Id: {rProduct.Id}, Name: {rProduct.ProductName}");
          _context.RecommentProducts.Add(new RecommentProduct() { CurrentProductId = p.Id, RecommentProductId = rProduct.Id });
          _context.SaveChanges();
        }
      });




    }

  }

  public class ProductFeatures
  {
    public int Id { get; set; }
    [VectorType(50)]
    public float[] Features { get; set; }
  }
}
