namespace shopping_cart_api.DTO
{
    public class CartItemDTO
    {
        public int CartItemId { get; set; }
        public int ShoppingCartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}