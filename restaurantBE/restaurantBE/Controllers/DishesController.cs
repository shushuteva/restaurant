using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantBE.Data;
using restaurantBE.DTOs;
using restaurantBE.Models;

namespace restaurantBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DishesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DishesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dishes = await _context.Dishes.ToListAsync();
            return Ok(dishes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
                return NotFound();

            return Ok(dish);
        }

       

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DishDto updatedDish)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
                return NotFound();

            dish.Name = updatedDish.Name;
            dish.Description = updatedDish.Description;
            dish.Image = updatedDish.Image;
            dish.Price = updatedDish.Price;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
                return NotFound();

            _context.Dishes.Remove(dish);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}