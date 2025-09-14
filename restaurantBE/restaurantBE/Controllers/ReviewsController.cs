using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantBE.Data;
using restaurantBE.DTOs;
using restaurantBE.Models;

namespace restaurantBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _context.Reviews.ToListAsync();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
                return NotFound();

            return Ok(review);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]ReviewDto updatedReview)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
                return NotFound();

            review.Title = updatedReview.Title;
            review.Text = updatedReview.Text;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
                return NotFound();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
