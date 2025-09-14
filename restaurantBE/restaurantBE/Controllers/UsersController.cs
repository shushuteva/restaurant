using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantBE.Data;
using restaurantBE.DTOs;
using restaurantBE.Models;
using restaurantBE.Services;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly PasswordService _passwordService;
    private readonly JwtService _jwtService;

    public UsersController(AppDbContext context, PasswordService passwordService, JwtService jwtService)
    {
        _context = context;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterUserDto dto)
    {
        if (_context.Users.Any(u => u.Email == dto.Email))
            return BadRequest("Email already in use.");

        _passwordService.CreatePasswordHash(dto.Password, out var hash, out var salt);

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return StatusCode(201, "Registration successful.");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginUserDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null || !_passwordService.VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt))
            return Unauthorized("Invalid email or password.");

        var token = _jwtService.GenerateToken(user);

        return Ok(new
        {
            token,
            message = "Login successful",
            user = new
            {
                user.Id,
                user.Email,
                user.Name
            }
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        return Ok(new { user.Id, user.Name, user.Email });
    }

    [HttpGet("{id}/orders")]
    public async Task<IActionResult> GetUserOrders(int id)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == id);
        if (!userExists)
            return NotFound($"User with ID {id} not found.");

        var orders = await _context.Orders
            .Where(o => o.UserId == id)
            .Include(o => o.Dishes)
            .ToListAsync();

        var orderDtos = orders.Select(o => new OrderDto
        {
            Id = o.Id,
            Total = o.Total,
            PaymentMethod = o.PaymentMethod,
            Status = o.Status,
            Dishes = o.Dishes.Select(d => new DishDto
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Image = d.Image,
                Price = d.Price
            }).ToList()
        }).ToList();

        return Ok(orderDtos);
    }
}
