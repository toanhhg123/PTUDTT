using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Config.Base;
using Backend.Interfaces;
using Backend.Models;
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

    [HttpGet]
    public async Task<IActionResult> Index()
    {
      var User = new User() { Name = "", Email = "abc@gmail.com" };

      await Task.CompletedTask;

      return this.OnSuccess(
        _authService.CreateToken(User)
      );
    }
  }
}
