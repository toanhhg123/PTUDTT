using Backend.Models;
using Backend.Models.ViewModel;

namespace Backend.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User> AddUserAsync(UserDTO model);
        Task<User?> UpdateUserAsync(int id, UserDTO model);
        Task<User?> DeleteUserAsync(int id);
    }
}
