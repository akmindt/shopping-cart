using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shopping_cart_api.Models;

namespace shopping_cart_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly ShoppingCartContext _context;

        public ShoppingCartsController(ShoppingCartContext context)
        {
            _context = context;
        }

        // GET: api/ShoppingCarts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetAllShoppingCarts()
        {
            return await _context.ShoppingCarts.ToListAsync();
        }

        // GET: api/ShoppingCarts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int id)
        {
            var ShoppingCart = await _context.ShoppingCarts.FindAsync(id);

            if (ShoppingCart == null)
            {
                return NotFound();
            }

            return ShoppingCart;
        }

        // PUT: api/ShoppingCarts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShoppingCart(int id, ShoppingCart ShoppingCart)
        {
            if (id != ShoppingCart.ShoppingCartId)
            {
                return BadRequest();
            }

            _context.Entry(ShoppingCart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartExists(id))
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

        // POST: api/ShoppingCarts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> PostShoppingCart(ShoppingCart ShoppingCart)
        {
            _context.ShoppingCarts.Add(ShoppingCart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingCart), new { id = ShoppingCart.ShoppingCartId }, ShoppingCart);
        }

        // DELETE: api/ShoppingCarts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingCart(int id)
        {
            var ShoppingCart = await _context.ShoppingCarts.FindAsync(id);
            if (ShoppingCart == null)
            {
                return NotFound();
            }

            _context.ShoppingCarts.Remove(ShoppingCart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShoppingCartExists(int id)
        {
            return _context.ShoppingCarts.Any(e => e.ShoppingCartId == id);
        }
    }
}
