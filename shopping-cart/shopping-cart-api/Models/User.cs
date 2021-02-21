using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shopping_cart_api.Models
{
    public class User {
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public string UserName { get; set; }
        
        [ForeignKey("ShoppingCartId")]
        public ShoppingCart ShoppingCart { get; set; }   
    }
}