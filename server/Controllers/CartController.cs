using Backend.Config.Base;
using Backend.DTO.Cart;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("cart")]
    [ApiController]
    public class CartController : ControllerProvider
    {
        private readonly ICartRepository _cartRepo;

        public CartController(ICartRepository cartRepo)
        {
            _cartRepo = cartRepo;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCartItems(int userId)
        {
            try
            {
                var cartItems = await _cartRepo.GetCartItemsAsync(userId);
                return this.OnSuccess(cartItems);
            }
            catch (Exception)
            {
                return this.OnError<Cart>("An error occurred while fetching the cart items.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProductToCart([FromBody] CartDTO cartDTO)
        {
            try
            {
                var cart = await _cartRepo.AddProductToCartAsync(cartDTO);
                return this.OnSuccess(cart);
            }
            catch (Exception)
            {
                return this.OnError<Cart>("An error occurred while adding product to cart.");
            }
        }

        [HttpPut("{cartId}")]
        public async Task<IActionResult> UpdateCartItem(int cartId, [FromBody] int quantity)
        {
            try
            {
                var updatedCart = await _cartRepo.UpdateCartItemAsync(cartId, quantity);
                if (updatedCart == null) return NotFound("Cart item not found.");
                return this.OnSuccess(updatedCart);
            }
            catch (Exception)
            {
                return this.OnError<Cart>("An error occurred while updating the cart item.");
            }
        }

        [HttpDelete("{cartId}")]
        public async Task<IActionResult> RemoveCartItem(int cartId)
        {
            try
            {
                var result = await _cartRepo.RemoveCartItemAsync(cartId);
                if (!result) return NotFound("Cart item not found.");
                return this.OnSuccess("Item removed from cart.");
            }
            catch (Exception)
            {
                return this.OnError<Cart>("An error occurred while removing the cart item.");
            }
        }

      
    }
}
