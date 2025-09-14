using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace restaurantBE.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public decimal Rating   { get; set; }
        public int RestaurantId { get; set; }

        [JsonIgnore]
        public Restaurant Restaurant { get; set; }
    }
}