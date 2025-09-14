using System.Collections.Generic;

namespace restaurantBE.DTOs
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public required string Cuisine { get; set; }
        public double Rating { get; set; }
        public required string Location { get; set; }
        public required string Image { get; set; }
        public required string Description { get; set; }
        public List<DishDto> Dishes { get; set; }
    }
}