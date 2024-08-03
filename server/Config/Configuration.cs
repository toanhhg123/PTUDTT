using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Backend.Config
{
  public static partial class Configuration
  {
    public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
    {
      var connectionString = configuration.GetConnectionString("sql");
      services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

    }

    public static void ConfigureServices(this IServiceCollection services)
    {
      services.AddSingleton<Constants, Constants>();
      services.AddScoped<IAuthService, AuthService>();
      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IBrandRepository, BrandRepository>();
      services.AddScoped<ICategoryRepository, CategoryRepository>();
      services.AddScoped<ISupplierRepository, SupplierRepository>();
      services.AddScoped<IUserAddressRepository, UserAddressRepository>();
      services.AddScoped<IProductRepository, ProductRepository>();
      services.AddScoped<ICartRepository, CartRepository>();
        }

    public static void ConfigureJwt(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
          .AddJwtBearer(options =>
          {
            options.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidateLifetime = true,
              ValidateIssuerSigningKey = true,
              ValidIssuer = configuration["Jwt:Issuer"],
              ValidAudience = configuration["Jwt:Audience"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
              ClockSkew = TimeSpan.Zero
            };
          });
      services.AddAuthorization(options =>
      {
        options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
        options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
      });
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
          {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
          });
      });
    }

    public static void ConfigureExceptionHandling(this IServiceCollection services)
    {
      services.AddExceptionHandler<NotFoundExceptionHandler>();
      services.AddExceptionHandler<GlobalExceptionHandler>();

      services.AddProblemDetails();
    }
  }
}
