using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantBE.Data;
using restaurantBE.DTOs;
using restaurantBE.Models;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto orderDto)
    {
        var user = await _context.Users.FindAsync(orderDto.UserId);
        if (user == null)
            return NotFound($"User with ID {orderDto.UserId} not found.");

        var dishes = await _context.Dishes
            .Where(d => orderDto.DishIds.Contains(d.Id))
            .ToListAsync();

        if (dishes.Count != orderDto.DishIds.Count)
            return BadRequest("Some dishes were not found.");

        var total = dishes.Sum(d => d.Price);

        var order = new Order
        {
            UserId = orderDto.UserId,
            PaymentMethod = orderDto.PaymentMethod,
            Total = total,
            Status = "pending",
            Dishes = dishes
        };

        foreach (var dish in dishes)
        {
            dish.Order = order;
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            order.Id,
            order.UserId,
            order.Total,
            order.Status,
            order.PaymentMethod,
            Dishes = dishes.Select(d => new
            {
                d.Id,
                d.Name,
                d.Price
            })
        });
    }
}
