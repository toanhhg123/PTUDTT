using Backend.Config.Base;
using Microsoft.AspNetCore.Diagnostics;

internal sealed class NotFoundExceptionHandler : IExceptionHandler
{
  private readonly ILogger<NotFoundExceptionHandler> _logger;

  public NotFoundExceptionHandler(ILogger<NotFoundExceptionHandler> logger)
  {
    _logger = logger;
  }

  public async ValueTask<bool> TryHandleAsync(
      HttpContext httpContext,
      Exception exception,
      CancellationToken cancellationToken)
  {

    if (exception is not NotFountException)
    {
      return false;
    }

    var res = new Response<Object>
    {
      Data = null!,
      Status = StatusCodes.Status404NotFound,
      Message = exception.Message,
      Error = exception.Message,
    };

    httpContext.Response.StatusCode = res.Status;

    await httpContext.Response
        .WriteAsJsonAsync(res, cancellationToken);

    return true;
  }
}
