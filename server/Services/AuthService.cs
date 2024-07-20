using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend.Config;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils.Commons;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{
  public class AuthService : BaseService, IAuthService
  {
    Constants constants;

    public AuthService(Constants constants)
    {
      this.constants = constants;
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
  }
}
