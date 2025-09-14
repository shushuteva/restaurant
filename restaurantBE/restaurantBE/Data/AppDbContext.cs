using Microsoft.EntityFrameworkCore;
using restaurantBE.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace restaurantBE.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Feedback>()
                .Property(m => m.Rating)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Dish>()
                .Property(m => m.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}