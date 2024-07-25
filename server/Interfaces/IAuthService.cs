using Backend.DTO.UserAccount;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        public string CreateToken(User user);
        Task<string?> LoginAsync(LoginDTO user);
        Task<User?> RegisterAsync(RegisterDTO user);


    }
}
