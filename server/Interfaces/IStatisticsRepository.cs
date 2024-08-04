namespace Backend.Interfaces
{
    public interface IStatisticsRepository
    {
        Task<decimal> GetTotalProductValueAsync();
        Task<int> GetTotalUserCountAsync();
        Task<decimal> GetSoldProductPercentageAsync();
        Task<decimal> GetTotalOrderRevenueAsync();
    }
}
