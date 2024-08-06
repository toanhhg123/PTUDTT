using Backend.DTO.Cart;

namespace Backend.Interfaces
{
    public interface IStatisticsRepository
    {
        Task<ReportDTO> GetReportAsync();
    }
}
