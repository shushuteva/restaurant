using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace restaurantBE.Models
{
    public class Dish
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Image { get; set; }

        public required decimal Price { get; set; }

        public int RestaurantId { get; set; }

        [JsonIgnore]
        public Restaurant Restaurant { get; set; }

        public int? OrderId { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

    }
}
