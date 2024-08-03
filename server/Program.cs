using Backend.Config;
using Backend.Config.ExceptionHandle;

var builder = WebApplication.CreateBuilder(args);


builder.Services.ConfigureCors();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// * config connect database
builder.Services.ConfigureDatabase(builder.Configuration);
// * end config database

//* config service
builder.Services.ConfigureServices();
//* end config service

// * config Jwt token
builder.Services.ConfigureJwt(builder.Configuration);
// * end config jwt token

// * config open api bearer token
builder.Services.ConfigureSwagger();
// * end config bearer token

// * handle global exception
builder.Services.ConfigureExceptionHandling();
// * end handle global exception

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
  // app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseExceptionHandler();
app.UseMiddleware<ExceptionHandlingMiddleware>();


app.Run();
