using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Config.Base;
using Backend.DTO.UserAccount;
using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("auth")]
  public class AuthController : ControllerProvider
  {
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
      _authService = authService;
    }

        //[HttpGet]
        //public async Task<IActionResult> Index()
        //{
        //  var User = new User() { Name = "", Email = "abc@gmail.com" };

        //  await Task.CompletedTask;

        //  return this.OnSuccess(
        //    _authService.CreateToken(User)
        //  );
        //}
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO user)
        {
            var token = await _authService.LoginAsync(user);
            if (token == null)
            {
                return OnError<string>("Invalid username or password.");
            }

            return OnSuccess(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO user)
        {
            var newUser = await _authService.RegisterAsync(user);
            if (newUser == null)
            {
                return OnError<string>("Username already exists.");
            }

            return OnSuccess(newUser);
        }

      
    }
}
