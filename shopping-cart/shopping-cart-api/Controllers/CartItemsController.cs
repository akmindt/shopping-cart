using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shopping_cart_api.Models;
using shopping_cart_api.DTO;

namespace shopping_cart_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly ShoppingCartContext _context;

        public CartItemsController(ShoppingCartContext context)
        {
            _context = context;
        }

        // GET: api/CartItems
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CartItemDTO>>> GetAllCartItems()
        {
            var cartItemQuery = from ci in _context.CartItems
                                select ci;
            List<CartItemDTO> result =  ConvertCartItemsToDTO(cartItemQuery.ToList());

            return await Task.FromResult(Ok(result));            
        }

        // GET: api/CartItems/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CartItemDTO>> GetCartItem(int id)
        {
            var CartItem = await _context.CartItems.FindAsync(id);

            if (CartItem == null)
            {
                return NotFound();
            }
            CartItemDTO result = ConvertCartItemToDTO(CartItem);
            return Ok(result);
        }

        // PUT: api/CartItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutCartItem(int id, CartItemDTO cartItemDTO)
        {
            if (id != cartItemDTO.CartItemId)
            {
                return BadRequest();
            }

            _context.Entry(ConvertDTOToCartItem(cartItemDTO)).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CartItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItemDTO cartItemDTO)
        {
            CartItem newItem = ConvertDTOToCartItem(cartItemDTO);
            _context.CartItems.Add(newItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItem), new { id = newItem.CartItemId }, newItem);
        }

        // DELETE: api/CartItems/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var CartItem = await _context.CartItems.FindAsync(id);
            if (CartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(CartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartItemExists(int id)
        {
            return _context.CartItems.Any(e => e.CartItemId == id);
        }

        private List<CartItemDTO> ConvertCartItemsToDTO(List<CartItem> modelItems)
        {
            return modelItems.Select(res => ConvertCartItemToDTO(res)).ToList();
        }

        private CartItemDTO ConvertCartItemToDTO(CartItem modelItem)
        {
            return new CartItemDTO
            {
                CartItemId = modelItem.CartItemId,
                ShoppingCartId = modelItem.ShoppingCartId,
                ProductId = modelItem.ProductId,
                Quantity = modelItem.Quantity
            };
        }

        private List<CartItem> ConvertDTOToCartItems(List<CartItemDTO> dtoItems)
        {
            return dtoItems.Select(res => ConvertDTOToCartItem(res)).ToList();
        }

        private CartItem ConvertDTOToCartItem(CartItemDTO dtoItem)
        {
            var productQuery = from p in _context.Products
                               where p.ProductId == dtoItem.ProductId
                               select p;

            //if the query result is null there will be problems but deal with that later                              
            return new CartItem
            {
                CartItemId = dtoItem.CartItemId,
                ShoppingCartId = dtoItem.ShoppingCartId,
                ProductId = dtoItem.ProductId,
                Product = productQuery.First(),
                Quantity = dtoItem.Quantity
            };
        }
    }
}
