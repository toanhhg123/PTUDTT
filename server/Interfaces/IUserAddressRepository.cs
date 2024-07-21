using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserAddressRepository
    {
        Task<IEnumerable<UserAddress>> GetAllUserAddressesAsync();
        Task<UserAddress?> GetUserAddressByIdAsync(int id);
        Task<UserAddress> AddUserAddressAsync(UserAddressDTO model);
        Task<UserAddress?> UpdateUserAddressAsync(int id, UserAddressDTO model);
        Task<UserAddress?> DeleteUserAddressAsync(int id);
    }
}
