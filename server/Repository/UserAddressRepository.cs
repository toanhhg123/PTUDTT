using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
  public class UserAddressRepository : IUserAddressRepository
  {
    private readonly AppDbContext _context;

    public UserAddressRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<IEnumerable<UserAddress>> GetAllUserAddressesAsync()
    {
      return await _context.UserAddress.ToListAsync();
    }

    public async Task<UserAddress?> GetUserAddressByIdAsync(int id)
    {
      return await _context.UserAddress.FirstOrDefaultAsync(u => u.UserId == id);
    }

    public async Task<UserAddress> AddUserAddressAsync(UserAddressDTO model)
    {
      var newUserAddress = new UserAddress
      {
        UserId = model.UserId,
        Address = model.Address,
        City = model.City,
        District = model.District,
        Ward = model.Ward,
        Country = model.Country,
        PostalCode = model.PostalCode
      };

      _context.UserAddress.Add(newUserAddress);
      await _context.SaveChangesAsync();

      return newUserAddress;
    }

    public async Task<UserAddress?> UpdateUserAddressAsync(int id, UserAddressDTO model)
    {
      var userAddress = await GetUserAddressByIdAsync(id);
      if (userAddress == null)
      {
        return null;
      }

      userAddress.UserId = model.UserId;
      userAddress.Address = model.Address;
      userAddress.City = model.City;
      userAddress.District = model.District;
      userAddress.Ward = model.Ward;
      userAddress.Country = model.Country;
      userAddress.PostalCode = model.PostalCode;

      _context.UserAddress.Update(userAddress);
      await _context.SaveChangesAsync();

      return userAddress;
    }

    public async Task<UserAddress?> DeleteUserAddressAsync(int id)
    {
      var userAddress = await _context.UserAddress.FindAsync(id);
      if (userAddress == null)
      {
        return null;
      }

      _context.UserAddress.Remove(userAddress);
      await _context.SaveChangesAsync();

      return userAddress;
    }
  }
}
