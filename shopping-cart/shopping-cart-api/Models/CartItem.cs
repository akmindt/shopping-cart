using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shopping_cart_api.Models
{
    public class CartItem
    {
        [Required]
        public int CartItemId { get; set; }
        
        public int ShoppingCartId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}