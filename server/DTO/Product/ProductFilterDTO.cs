namespace Backend.DTO.Product
{
    public class ProductFilterDTO
    {
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? Color { get; set; }
        public string? SizeInch { get; set; }
    }
}
