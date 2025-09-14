namespace restaurantBE.DTOs
{
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public List<int> DishIds { get; set; } = new();
        public string PaymentMethod { get; set; } = "cash";
    }
}
