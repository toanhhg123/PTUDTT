using System.Net;
using Backend.Config.Base;
using Microsoft.AspNetCore.Diagnostics;

internal sealed class GlobalExceptionHandler : IExceptionHandler
{
  private readonly ILogger<GlobalExceptionHandler> _logger;

  public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
  {
    _logger = logger;
  }

  public async ValueTask<bool> TryHandleAsync(
      HttpContext httpContext,
      Exception exception,
      CancellationToken cancellationToken)
  {
    _logger.LogError(
        exception, "Exception occurred: {Message}", exception.Message);

    var res = new Response<Object>
    {
      Data = null!,
      Status = StatusCodes.Status400BadRequest,
      Message = exception.Message,
      Error = exception.Message,
    };

    httpContext.Response.StatusCode = res.Status;

    await httpContext.Response
        .WriteAsJsonAsync(res, cancellationToken);

    return true;
  }
}
