using Microsoft.EntityFrameworkCore;

namespace shopping_cart_api.Models
{
    public class ShoppingCartContext : DbContext
    {
        public ShoppingCartContext(DbContextOptions<ShoppingCartContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}