using Backend.Config.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("user")]
[Authorize]
public class UserController : ControllerProvider
{
  [HttpGet]
  public IActionResult GetStrings()
  {
    return this.OnSuccess(new List<String>() { "123", "2" });
  }

  [HttpGet("{id}")]
  public List<string> getById(int id)
  {
    return new List<string> { id.ToString() };
  }
}
