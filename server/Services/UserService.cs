using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Backend.Utils.Commons;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> AddUserAsync(UserDTO model)
        {
            var newUser = new User
            {
                Name = model.Name,
                Email = model.Email,
                Username = model.Username,
                Password = model.Password,
                Phone = model.Phone,
                CreateAt = DateTime.Now,
                ModifiedAt = DateTime.Now,
                IsActive = true
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User?> UpdateUserAsync(int id, UserDTO model)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            if (await _context.Users.AnyAsync(u => u.Username == model.Username && u.Id != id))
            {
                return null;
            }

            user.Name = model.Name;
            user.Email = model.Email;
            user.Username = model.Username;
            user.Password = model.Password;
            user.Phone = model.Phone;
            user.ModifiedAt = DateTime.Now;
            user.IsActive = model.IsActive;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
