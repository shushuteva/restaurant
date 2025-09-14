namespace restaurantBE.DTOs
{
    public class DishDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Image { get; set; }

        public required decimal Price { get; set; }

        public int RestaurantId { get; set; }
    }
}