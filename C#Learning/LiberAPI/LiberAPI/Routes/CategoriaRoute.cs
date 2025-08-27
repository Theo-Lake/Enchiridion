using LiberAPI.Data;
using LiberAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LiberAPI.Routes;

public static class CategoriaRoute
{
    public static void MapCategorias(this WebApplication app)
    {
        var route = app.MapGroup("/categorias"); 
        route.MapPost("", async (CategoriaRequest req, AppDbContext context) =>
        {
            var categoria = new Categoria(req.Nome);
            if (req.Nome == null)
                return Results.BadRequest("Nome e necessario");
            await context.Categorias.AddAsync(categoria);
            await context.SaveChangesAsync();
            
            return Results.Created($"/categorias/{categoria.Id}", new { categoria.Id, categoria.Nome });
        });
        
        route.MapGet("", async (AppDbContext context) =>
        {
            var categoria = await context.Categorias.ToListAsync();
            return Results.Ok(categoria);
        });
        
        route.MapPut("{id:int}", async (int id, CategoriaRequest req, AppDbContext context) =>
        {
            var categoria = await context.Categorias.FindAsync(id);

            if (categoria == null) { return Results.NotFound(); }

            categoria.ChangeCategoria(req.Nome);
            await context.SaveChangesAsync();
            return Results.Ok(categoria);
        });

        route.MapDelete("{id:int}", async (int id, AppDbContext context) =>
        {
            var categoria = await context.Categorias.FindAsync(id);
            if (categoria == null) { return Results.NotFound(); }
            context.Categorias.Remove(categoria);
            await context.SaveChangesAsync();   
            return Results.Ok();
        });
    }
    
}
