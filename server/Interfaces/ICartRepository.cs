using Backend.DTO.Cart;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> AddProductToCartAsync(CartDTO cartDTO);
        Task<Cart?> UpdateCartItemAsync(int cartId, int quantity);
        Task<bool> RemoveCartItemAsync(int cartId);
        Task<IEnumerable<Cart>> GetCartItemsAsync(int userId);
    }
}
