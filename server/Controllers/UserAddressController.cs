using Backend.Config.Base;
using Backend.DTO;
using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("useraddress")]
    [ApiController]
    public class UserAddressController : ControllerProvider
    {
        private readonly IUserAddressRepository _userAddressRepo;

        public UserAddressController(IUserAddressRepository userAddressRepo)
        {
            _userAddressRepo = userAddressRepo;
        }

        // Get all user addresses
        [HttpGet]
        public async Task<IActionResult> GetUserAddresses()
        {
            var userAddresses = await _userAddressRepo.GetAllUserAddressesAsync();
            return this.OnSuccess(userAddresses);
        }

        // Get user address by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAddressById(int id)
        {
            var userAddress = await _userAddressRepo.GetUserAddressByIdAsync(id);
            if (userAddress == null)
            {
                throw new Exception("User address not found.");
            }

            return this.OnSuccess(userAddress);
        }

        // Add a new user address
        [HttpPost]
        public async Task<IActionResult> AddUserAddress([FromBody] UserAddressDTO model)
        {
            try
            {
                var newUserAddress = await _userAddressRepo.AddUserAddressAsync(model);
                return this.OnSuccess(newUserAddress);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Update an existing user address
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAddress(int id, [FromBody] UserAddressDTO model)
        {
            try
            {
                var updatedUserAddress = await _userAddressRepo.UpdateUserAddressAsync(id, model);
                if (updatedUserAddress == null)
                {
                    throw new Exception("User address not found or unable to update.");
                }

                return this.OnSuccess(updatedUserAddress);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Delete a user address
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAddress(int id)
        {
            var deletedUserAddress = await _userAddressRepo.DeleteUserAddressAsync(id);
            if (deletedUserAddress == null)
            {
                throw new Exception("User address not found or unable to delete.");
            }

            return this.OnSuccess(deletedUserAddress);
        }
    }
}
