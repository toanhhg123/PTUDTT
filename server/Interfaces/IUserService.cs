using Backend.Models.ViewModel;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User> AddUserAsync(UserDTO model);
        Task<User?> UpdateUserAsync(int id, UserDTO model);
        Task<User?> DeleteUserAsync(int id);
    }
}
