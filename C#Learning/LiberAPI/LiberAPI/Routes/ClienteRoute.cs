using LiberaAPI;
using LiberAPI.Data;
using LiberAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LiberAPI.Routes
{
    public static class ClienteRoute
    {
        public static void MapCliente(this WebApplication app)
        {
            var route = app.MapGroup("clientes"); //this is used so app.MapGroup("").Map... isnt needed
                            
                            //patttern "" is just what would be added under cliente so /cliente/create if pattern was "create"
            //CREATE
            route.MapPost("", async (ClienteRequest req, AppDbContext context) =>
            {
                var cliente = new Cliente(req.Nome, req.Telefone);
                await context.Clientes.AddAsync(cliente);
                await context.SaveChangesAsync();
            });

            //READ
            route.MapGet("", async (AppDbContext context) =>
            {
                var cliente = await context.Clientes.ToListAsync();
                return Results.Ok(cliente);
            });

            //UPDATE
            route.MapPut("{id:int}", async (int id, ClienteRequest req, AppDbContext context) =>
            {
                var cliente = await context.Clientes.FindAsync(id);

                if (cliente == null) { return Results.NotFound(); }

                cliente.ChangeName(req.Nome);
                await context.SaveChangesAsync();
                return Results.Ok(cliente);
            });

            //DELETE
            route.MapDelete("{id:int}", async (int id, AppDbContext context) =>
            {
                var cliente = await context.Clientes.FindAsync(id);
                if (cliente == null) { return Results.NotFound(); }
                context.Clientes.Remove(cliente);
                await context.SaveChangesAsync();   
                return Results.Ok();
            });
        }
    }
}

