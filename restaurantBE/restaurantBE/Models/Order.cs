using System.ComponentModel.DataAnnotations;

namespace restaurantBE.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public decimal Total { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public string Status { get; set; } = "pending";

        public ICollection<Dish> Dishes { get; set; } = new List<Dish>();
    }
}
