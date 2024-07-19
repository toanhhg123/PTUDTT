using Backend.Config.Base;
using Backend.Models;
using Backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("user")]

public class UserController : ControllerProvider
{
    private readonly PtudttContext _context;

    public UserController(PtudttContext context)
    {
        _context = context;
    }

    //[HttpGet]
    //public IActionResult GetStrings()
    //{
    //  return this.OnSuccess(new List<String>() { "123", "2" });
    //}

    //[HttpGet("{id}")]
    //public List<string> getById(int id)
    //{
    //  return new List<string> { id.ToString() };
    //}

    // GetUsers
    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _context.Users.Select(user => new
        {
            user.Id,
            user.Name,
            user.Email,
            user.Username,
            user.Phone,
            user.Role,
            user.CreateAt,
            user.ModifiedAt,
            user.IsActive
        }).ToList();

        return this.OnSuccess(users);
    }
    // End GetUsers

    // GetUserById
    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _context.Users.Select(u => new
        {
            u.Id,
            u.Name,
            u.Email,
            u.Username,
            u.Phone,
            u.Role,
            u.CreateAt,
            u.ModifiedAt,
            u.IsActive
        }).FirstOrDefault(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return this.OnSuccess(user);
    }
    // End GetUserById

    // AddUser
    [HttpPost]
    public IActionResult AddUser(UserVM model)
    {
        try
        {
            var newUser = new User
            {
                Name = model.Name,
                Email = model.Email,
                Username = model.Username,
                Password = model.Password,
                Phone = model.Phone,
                Role = model.Role,
                CreateAt = DateTime.Now,
                ModifiedAt = DateTime.Now,
                IsActive = true
            };
            _context.Add(newUser);
            _context.SaveChanges();
            return this.OnSuccess(newUser);
        }
        catch
        {
            return BadRequest();
        }
    }
    // End AddUser

    // UpdateUser
    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, UserVM model)
    {
        try
        {
            var user = _context.Users.SingleOrDefault(i => i.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            // Cập nhật các thuộc tính của người dùng
            user.Name = model.Name;
            user.Email = model.Email;
            user.Username = model.Username;
            user.Password = model.Password;
            user.Phone = model.Phone;
            user.Role = model.Role;
            user.ModifiedAt = DateTime.UtcNow;
            user.IsActive = model.IsActive;

            _context.Users.Update(user);
            _context.SaveChanges();

            return this.OnSuccess(user);
        }
        catch
        {
            return BadRequest();
        }
    }
    // End UpdateUser

    // DeleteUser
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        try
        {
            var user = _context.Users.SingleOrDefault(i => i.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return this.OnSuccess(user);
        }
        catch
        {
            return BadRequest();
        }
    }
    // End DeleteUser
}
