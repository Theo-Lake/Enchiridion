using LiberAPI.Data;
using LiberAPI.Routes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var cs = builder.Configuration.GetConnectionString("Sqlite") ?? "Data Source=sqlite.db";
//Read connection string from appsettings.json or use fallback
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(cs));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.MapCliente();
app.MapProdutos();
app.MapVendas();
app.MapCategorias();

app.UseHttpsRedirection();
app.UseDefaultFiles();   
app.UseStaticFiles();


app.UseHttpsRedirection();
app.Run();


