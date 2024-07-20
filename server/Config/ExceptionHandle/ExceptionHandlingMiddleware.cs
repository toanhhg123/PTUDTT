namespace Backend.Config.ExceptionHandle
{
  public class ExceptionHandlingMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
      _next = next;
      _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      await _next(context);

      if (context.Response.StatusCode == 404)
      {
        throw new NotFountException("Api not found");
      }
    }

  }
}
