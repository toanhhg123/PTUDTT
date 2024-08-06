namespace Backend.DTO.Cart
{
    public class ReportDTO
    {
        public decimal TotalProductValue { get; set; }
        public int TotalUserCount { get; set; }
        public decimal SoldProductPercentage { get; set; }
        public decimal TotalOrderRevenue { get; set; }
    }
}
