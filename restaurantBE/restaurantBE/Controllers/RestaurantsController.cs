using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantBE.Data;
using restaurantBE.DTOs;
using restaurantBE.Models;
using System.Net.Cache;
using System.Threading.Tasks;

namespace restaurantBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RestaurantsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var restaurants = await _context.Restaurants.Include(x => x.Feedbacks).ToListAsync();
            return Ok(restaurants);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var restaurant = await _context.Restaurants
            .Include(r => r.Dishes)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (restaurant == null)
            {
                return NotFound();
            }

            var restaurantDto = new RestaurantDto
            {
                Id = restaurant.Id,
                Name = restaurant.Name,
                Cuisine = restaurant.Cuisine,
                Rating = restaurant.Rating,
                Location = restaurant.Location,
                Image = restaurant.Image,
                Description = restaurant.Description,
                Dishes = restaurant.Dishes.Select(d => new DishDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Description = d.Description,
                    Image = d.Image,
                    Price = d.Price,
                    RestaurantId = d.RestaurantId
                }).ToList()
            };

            return Ok(restaurantDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Restaurant restaurant)
        {
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = restaurant.Id }, restaurant);
        }

        [HttpPost("{id}/dishes")]
        public async Task<IActionResult> AddDish(int id, [FromBody] DishDto dishDto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound($"Restaurant with ID {id} not found.");
            }

            var dish = new Dish
            {
                Name = dishDto.Name,
                Description = dishDto.Description,
                Image = dishDto.Image,
                Price = dishDto.Price,
                RestaurantId = id
            };

            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        [HttpPost("{id}/reviews")]
        public async Task<IActionResult> AddReview(int id, [FromBody] ReviewDto reviewDto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound($"Restaurant with ID {id} not found.");
            }

            var review = new Review
            {
                Title = reviewDto.Title,
                Text = reviewDto.Text,
                RestaurantId = id
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }

        [HttpGet("{id}/reviews")]
        public async Task<IActionResult> getReviews(int id, [FromBody] ReviewDto reviewDto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound($"Restaurant with ID {id} not found.");
            }

            var reviews=restaurant.Reviews;
            
            return Ok(reviews);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Restaurant updatedRestaurant)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
                return NotFound();

            restaurant.Name = updatedRestaurant.Name;
            restaurant.Cuisine = updatedRestaurant.Cuisine;
            restaurant.Rating = updatedRestaurant.Rating;
            restaurant.Location = updatedRestaurant.Location;
            restaurant.Image = updatedRestaurant.Image;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/feedbacks")]
        public async Task<IActionResult> AddFeedback(int id, [FromBody] FeedbackDto feedbackDto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound($"Restaurant with ID {id} not found.");
            }

            var feedback = new Feedback
            {
                Rating = feedbackDto.Rating,
                RestaurantId = id
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(feedback);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
                return NotFound();

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}