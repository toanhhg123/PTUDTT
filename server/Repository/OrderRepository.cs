using Backend.DTO.Order;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
  public class OrderRepository : IOrderRepository
  {
    private readonly AppDbContext _context;


    public OrderRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<Order> PlaceOrderAsync(OrderDTO orderDto)
    {
      try
      {
        // Check if cart items exist for the user
        var cartItems = await _context.Carts
            .Where(c => c.UserId == orderDto.UserId)
            .ToListAsync();

        if (cartItems.Count == 0)
        {
          throw new Exception("Cart is empty.");
        }

        // Create the order
        var order = new Order
        {
          UserId = orderDto.UserId,
          Status = "Chờ giao hàng",
          OrderDate = DateTime.Now,
          DeliveryDate = DateTime.Now.AddDays(7), // Example delivery date
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync(); // Save the order first to get the OrderId

        // Create order details based on cart items
        var orderDetails = cartItems.Select(cartItem => new OrderDetail
        {
          OrderId = order.Id,
          ProductId = cartItem.ProductId,
          Quantity = cartItem.Quantity,
          Price = _context.Products.FirstOrDefault(p => p.Id == cartItem.ProductId)?.SellPrice ?? 0
        }).ToList();

        // Calculate total price
        order.TotalPrice = orderDetails.Sum(od => od.Quantity * od.Price);

        order.OrderDetails = orderDetails; // Associate order details with the order
        _context.OrderDetails.AddRange(orderDetails);
        await _context.SaveChangesAsync();

        // Optionally, clear the cart after placing the order
        _context.Carts.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return order;
      }
      catch (Exception ex)
      {
        // Log the exception details
        Console.WriteLine($"Error: {ex.Message}");
        Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
        throw; // Re-throw the exception if needed
      }
    }



    public async Task<Order?> GetOrderByIdAsync(int id)
    {
      return await _context.Orders
          .Include(o => o.OrderDetails)
          .ThenInclude(od => od.Product)
          .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<IEnumerable<Order>> GetAllOrdersAsync()
    {
      return await _context.Orders
           .Include(o => o.User)
          .Include(o => o.OrderDetails)
          .ThenInclude(od => od.Product)
          .ToListAsync();
    }
    public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
    {
      return await _context.Orders
          .Where(o => o.UserId == userId)
          .Include(o => o.OrderDetails)
          .ThenInclude(od => od.Product)
          .ToListAsync();
    }
        public async Task<Order?> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null || order.OrderDetails.Any())
            {
                return null;
            }

            _context.Orders.Remove(order);
           // await _context.SaveChangesAsync();

            return order;
        }
    }
}
