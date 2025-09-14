using System.ComponentModel.DataAnnotations;

namespace restaurantBE.DTOs
{
    public class RegisterUserDto
    {
        [Required]
        public required string Name { get; set; }

        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }   
    }
}