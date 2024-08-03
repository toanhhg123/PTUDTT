using Backend.DTO.Cart;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> AddProductToCartAsync(CartDTO cartDTO)
        {
            var existingCart = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == cartDTO.UserId && c.ProductId == cartDTO.ProductId);

            if (existingCart != null)
            {
                existingCart.Quantity += cartDTO.Quantity;
                _context.Carts.Update(existingCart);
            }
            else
            {
                var newCart = new Cart
                {
                    UserId = cartDTO.UserId,
                    ProductId = cartDTO.ProductId,
                    Quantity = cartDTO.Quantity
                };
                _context.Carts.Add(newCart);
                existingCart = newCart;
            }

            await _context.SaveChangesAsync();
            return existingCart;
        }

        public async Task<Cart?> UpdateCartItemAsync(int cartId, int quantity)
        {
            var cartItem = await _context.Carts.FindAsync(cartId);
            if (cartItem == null) return null;

            cartItem.Quantity = quantity;
            _context.Carts.Update(cartItem);
            await _context.SaveChangesAsync();
            return cartItem;
        }

        public async Task<bool> RemoveCartItemAsync(int cartId)
        {
            var cartItem = await _context.Carts.FindAsync(cartId);
            if (cartItem == null) return false;

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Cart>> GetCartItemsAsync(int userId)
        {
            return await _context.Carts
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }
    }
}
