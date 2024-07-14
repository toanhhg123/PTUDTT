using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Config.Base
{
  public class Response<T>
  {
    public required T Data { get; set; } = default!;
    public string Error { get; set; } = String.Empty;
    public string Message { get; set; } = String.Empty;
    public int Status { get; set; }
  }

  public class ControllerProvider : ControllerBase
  {
    public IActionResult OnSuccess<T>(T data)
    {
      var response = new Response<T>()
      {
        Message = "Success",
        Data = data,
        Status = StatusCodes.Status200OK,
        Error = string.Empty
      };
      return Ok(response);
    }

    public IActionResult OnError<T>(string error)
    {
      var response = new Response<T>()
      {
        Message = "Error",
        Data = default!,
        Status = StatusCodes.Status400BadRequest,
        Error = error
      };
      return BadRequest(response);
    }
  }
}
