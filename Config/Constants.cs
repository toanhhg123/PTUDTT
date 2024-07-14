using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Config
{
  public class Constants
  {
    IConfiguration _configuration;
    public string JWT_KEY = "";
    public string Issuer = "";
    public string Audience = "";
    public Constants(IConfiguration configuration)
    {
      Console.WriteLine("Injection const");
      _configuration = configuration;
      this.JWT_KEY = _configuration["Jwt:Key"]!;
      this.Issuer = _configuration["Jwt:Issuer"]!;
      this.Audience = _configuration["Jwt:Audience"]!;
    }
  }
}
