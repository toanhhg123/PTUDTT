using Backend.Config.Base;
using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("user")]

public class UserController : ControllerProvider
{
    private readonly IUserRepository _userRepo;

    public UserController(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    // GET: api/user
    //[Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userRepo.GetAllUsersAsync();
        return this.OnSuccess(users);
    }

    // GET: api/user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userRepo.GetUserByIdAsync(id);

        if (user == null)
        {
            throw new Exception("User not found.");
        }

        return this.OnSuccess(user);
    }

    // POST: api/user
    [HttpPost]
    public async Task<IActionResult> AddUser(UserDTO model)
    {
        if (await _userRepo.GetUserByUsernameAsync(model.Username) != null)
        {
            throw new Exception("Username already exists.");
        }

        var newUser = await _userRepo.AddUserAsync(model);
        return this.OnSuccess(newUser);
    }

    // PUT: api/user/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserDTO model)
    {
        var updatedUser = await _userRepo.UpdateUserAsync(id, model);
        if (updatedUser == null)
        {
            throw new Exception("User not found or username already exists.");
        }
        return this.OnSuccess(updatedUser);
    }

    // DELETE: api/user/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var deletedUser = await _userRepo.DeleteUserAsync(id);
        if (deletedUser == null)
        {
            throw new Exception("User not found or unable to delete.");
        }
        return this.OnSuccess(deletedUser);
    }

}
