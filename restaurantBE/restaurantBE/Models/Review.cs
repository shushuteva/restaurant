using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace restaurantBE.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Text { get; set; }

        [Required]
        public int RestaurantId { get; set; }

        [JsonIgnore]
        public Restaurant Restaurant { get; set; }
    }
}
