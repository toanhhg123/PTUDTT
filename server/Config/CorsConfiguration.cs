namespace Backend.Config
{
  public static partial class Configuration
  {
    public static void ConfigureCors(this IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll", builder =>
                  {
                    builder
                          .AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                  });
      });
    }


  }
}
