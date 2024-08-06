using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Backend.Utils.Commons;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Backend.Services
{
    public class UserRepository : BaseService, IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
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
                Role = model.Role,
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
            user.Role = model.Role;
            user.ModifiedAt = DateTime.Now;
            user.IsActive = model.IsActive;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> DeleteUserAsync(int id)
        {
            // Tìm kiếm người dùng theo id
            var user = await _context.Users
                .Include(u => u.UsersAddress)  
                .Include(u => u.Orders)          
                .Include(u => u.Carts)          
                .Include(u => u.PurchaseOrders)  
                .FirstOrDefaultAsync(u => u.Id == id);

            // Kiểm tra nếu người dùng không tồn tại hoặc có dữ liệu liên quan
            if (user == null ||
                user.UsersAddress.Any() ||
                user.Orders.Any() ||
                user.Carts.Any() ||
                user.PurchaseOrders.Any())
            {
                return null; // Không xóa nếu có liên kết dữ liệu hoặc không tìm thấy người dùng
            }

            // Xóa người dùng
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
