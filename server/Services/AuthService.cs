using Backend.Config;
using Backend.DTO.UserAccount;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils.Commons;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Backend.Services
{
  public class AuthService : BaseService, IAuthService
  {
    Constants constants;
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    public AuthService(Constants constants, AppDbContext context, IConfiguration configuration)
    {
      this.constants = constants;
      _context = context;
      _configuration = configuration;
    }

    public string CreateToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(constants.JWT_KEY);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, "ADMIN"),
          }),
        Expires = DateTime.UtcNow.AddHours(100),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        Issuer = constants.Issuer,
        Audience = constants.Audience,
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
    public async Task<string?> LoginAsync(LoginDTO user)
    {
      var dbUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

      if (dbUser == null)
      {
        return null;
      }

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(constants.JWT_KEY);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                new Claim(ClaimTypes.Name, dbUser.Username),
                new Claim(ClaimTypes.Role, dbUser.Role),
                new Claim("id",dbUser.Id.ToString()),
          }),
        Expires = DateTime.UtcNow.AddHours(100),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        Issuer = constants.Issuer,
        Audience = constants.Audience,
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    public async Task<User?> RegisterAsync(RegisterDTO user)
    {
      if (await _context.Users.AnyAsync(u => u.Username == user.Username))
      {
        return null;
      }

      var newUser = new User
      {
        Name = user.Name,
        Username = user.Username,
        Password = user.Password,
        Email = user.Email,
        Phone = user.Phone,
        CreateAt = DateTime.Now,
        ModifiedAt = DateTime.Now,
        IsActive = true,

      };

      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();
      return newUser;
    }


  }
}
