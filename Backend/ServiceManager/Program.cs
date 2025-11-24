using Microsoft.EntityFrameworkCore;
using ServiceManager.Data;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var conectionString = builder.Configuration.GetConnectionString("AppDbConnection");

builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(conectionString,ServerVersion.AutoDetect
    (conectionString)));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // The Angular client's origin
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAngularClient");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
