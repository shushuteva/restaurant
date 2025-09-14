namespace restaurantBE.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public decimal Total { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public string Status { get; set; } = null!;
        public List<DishDto> Dishes { get; set; } = new();
    }
}
