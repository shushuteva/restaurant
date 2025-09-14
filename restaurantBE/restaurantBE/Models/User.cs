using System.ComponentModel.DataAnnotations;

namespace restaurantBE.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required, EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Name { get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        [Required]
        public required string PasswordSalt { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
