using System.ComponentModel.DataAnnotations;

namespace shopping_cart_api.Models
{
    public class Product
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int Stock { get; set; }
        
        [Required]
        public double Price { get; set; }
    }
}