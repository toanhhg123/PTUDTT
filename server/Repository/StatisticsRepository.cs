using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly AppDbContext _context;

        public StatisticsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetTotalProductValueAsync()
        {
            var totalProductValue = await _context.Products
                .SumAsync(p => p.PurchasePrice * p.Stock);
            return totalProductValue;
        }

        public async Task<int> GetTotalUserCountAsync()
        {
            var totalUsers = await _context.Users.CountAsync();
            return totalUsers;
        }

        public async Task<decimal> GetSoldProductPercentageAsync()
        {
            var totalProducts = await _context.Products.SumAsync(p => p.Stock);
            var soldProducts = await _context.OrderDetails.SumAsync(od => od.Quantity);

            return totalProducts == 0 ? 0 : (decimal)soldProducts / totalProducts * 100;
        }

        public async Task<decimal> GetTotalOrderRevenueAsync()
        {
            var totalOrderRevenue = await _context.Orders.SumAsync(o => o.TotalPrice);
            return totalOrderRevenue;
        }
    }
}
