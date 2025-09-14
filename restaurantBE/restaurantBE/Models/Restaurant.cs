using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace restaurantBE.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public required string Cuisine { get; set; }
        public double Rating { get; set; }
        public required string Location { get; set; }
        public required string Image { get; set; }
        public required string Description { get; set; }

        public ICollection<Dish> Dishes { get; set; } = new List<Dish>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    }
}