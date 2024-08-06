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

        [HttpGet("report")]
        public async Task<IActionResult> GetReportAsync()
        {
            var report = await _statisticsRepo.GetReportAsync();
            return Ok(report);
        }
    }
}
