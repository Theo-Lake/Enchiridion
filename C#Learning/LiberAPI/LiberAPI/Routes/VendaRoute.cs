using LiberaAPI;
using LiberAPI.Data;
using LiberAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LiberAPI.Routes;

public static class VendaRoute
{
    public static void MapVendas(this WebApplication app)
    {
        var route = app.MapGroup("vendas");
        
        route.MapPost("", async (VendaRequest req, AppDbContext context) =>
        {
            var venda = new Venda(req.ClienteId);
            await context.Vendas.AddAsync(venda);
            //TODO need to make it so ItemVenda is also added through here
            await context.SaveChangesAsync();
            
            return Results.Created($"vendas/{venda.Id}", venda);
            
        });
        
        route.MapGet("", async (AppDbContext context) =>
        {
            var venda = await context.Vendas.ToListAsync();
            return Results.Ok(venda);
        });

        route.MapPut("", async (int id, VendaRequest req, AppDbContext context) =>
        {
            
        });
    }
    
}