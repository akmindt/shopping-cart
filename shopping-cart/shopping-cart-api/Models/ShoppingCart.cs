using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace shopping_cart_api.Models
{
    public class ShoppingCart
    {
        [Required]
        public int ShoppingCartId { get; set; }

        public IEnumerable<Product> Products { get; set; }

    }
}