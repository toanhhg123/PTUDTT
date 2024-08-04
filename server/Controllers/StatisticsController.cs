using Backend.Config.Base;
using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("statistics")]
    [ApiController]
    public class StatisticsController : ControllerProvider
    {
        private readonly IStatisticsRepository _statisticsRepo;

        public StatisticsController(IStatisticsRepository statisticsRepo)
        {
            _statisticsRepo = statisticsRepo;
        }

        [HttpGet("total-product-revenue")]
        public async Task<IActionResult> GetTotalProductRevenue()
        {
            var totalRevenue = await _statisticsRepo.GetTotalProductValueAsync();
            return OnSuccess(new { totalRevenue });
        }

        [HttpGet("total-users")]
        public async Task<IActionResult> GetTotalUserCount()
        {
            var totalUsers = await _statisticsRepo.GetTotalUserCountAsync();
            return OnSuccess(new { totalUsers });
        }

        [HttpGet("sold-product-percentage")]
        public async Task<IActionResult> GetSoldProductPercentage()
        {
            var soldProductPercentage = await _statisticsRepo.GetSoldProductPercentageAsync();
            return OnSuccess(new { soldProductPercentage });
        }

        [HttpGet("total-order-revenue")]
        public async Task<IActionResult> GetTotalOrderRevenue()
        {
            var totalOrderRevenue = await _statisticsRepo.GetTotalOrderRevenueAsync();
            return OnSuccess(new { totalOrderRevenue });
        }
    }
}
