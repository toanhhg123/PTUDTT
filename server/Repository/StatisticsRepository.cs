using Backend.DTO.Cart;
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

        public async Task<ReportDTO> GetReportAsync()
        {
            var totalProductValue = await _context.Products
                .SumAsync(p => p.PurchasePrice * p.Stock);

            var totalUsers = await _context.Users.CountAsync();

            var totalProducts = await _context.Products.SumAsync(p => p.Stock);
            var soldProducts = await _context.OrderDetails.SumAsync(od => od.Quantity);
            var soldProductPercentage = totalProducts == 0 ? 0 : (decimal)soldProducts / totalProducts * 100;

            var totalOrderRevenue = await _context.Orders.SumAsync(o => o.TotalPrice);

            return new ReportDTO
            {
                TotalProductValue = totalProductValue,
                TotalUserCount = totalUsers,
                SoldProductPercentage = soldProductPercentage,
                TotalOrderRevenue = totalOrderRevenue
            };
        }
    }
}
