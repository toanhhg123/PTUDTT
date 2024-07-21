﻿using Backend.Config.Base;
using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("user")]

public class UserController : ControllerProvider
{
    private readonly IUserRepository _userService;

    public UserController(IUserRepository userService)
    {
        _userService = userService;
    }

    // GET: api/user
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return this.OnSuccess(users);
    }

    // GET: api/user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
        {
            return this.OnError<User>("User not found.");
        }

        return this.OnSuccess(user);
    }

    // POST: api/user
    [HttpPost]
    public async Task<IActionResult> AddUser(UserDTO model)
    {
        if (await _userService.GetUserByUsernameAsync(model.Username) != null)
        {
            return this.OnError<User>("Username already exists.");
        }

        var newUser = await _userService.AddUserAsync(model);
        return this.OnSuccess(newUser);
    }

    // PUT: api/user/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserDTO model)
    {
        var updatedUser = await _userService.UpdateUserAsync(id, model);
        if (updatedUser == null)
        {
            return this.OnError<User>("User not found or username already exists.");
        }
        return this.OnSuccess(updatedUser);
    }

    // DELETE: api/user/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var deletedUser = await _userService.DeleteUserAsync(id);
        if (deletedUser == null)
        {
            return this.OnError<User>("User not found.");
        }
        return this.OnSuccess(deletedUser);
    }

}