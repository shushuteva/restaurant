using System.ComponentModel.DataAnnotations;

namespace restaurantBE.DTOs
{
    public class FeedbackDto
    {
        public int Id { get; set; }
        [Required]
        [Range(1,5)]
        public decimal Rating { get; set; }
        public int RestaurantId { get; set; }

    }
}