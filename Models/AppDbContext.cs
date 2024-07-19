using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
  public class AppDbContext : DbContext
  {

   
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }


  }
}
