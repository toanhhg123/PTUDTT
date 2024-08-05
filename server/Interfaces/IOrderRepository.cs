using Backend.DTO.Order;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> PlaceOrderAsync(OrderDTO orderDto);
        Task<Order?> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<List<Order>> GetOrdersByUserIdAsync(int userId);
    }
}
