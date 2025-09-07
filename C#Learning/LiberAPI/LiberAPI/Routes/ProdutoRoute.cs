using LiberaAPI;
using LiberAPI.Data;
using LiberAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LiberAPI.Routes;

public static class ProdutoRoute
{
    public static void MapProdutos(this WebApplication app)
    {
        var route = app.MapGroup("/produtos");

        route.MapPost("", async (ProdutoRequest req, AppDbContext context) =>
        {
            var produto = new Produto(req.Nome, req.CategoriaId, req.Preco, req.Imagem);
            await context.Produtos.AddAsync(produto);
            await context.SaveChangesAsync();

            return Results.Created($"/produtos/{produto.Id}", produto);
        });

        route.MapGet("", async (AppDbContext context) =>
        {
            var produto = await context.Produtos
                .Include(p => p.Categoria)
                .ToListAsync(); //this is so that it displays the categoria inside the produto get
            return Results.Ok(produto);
        });

        route.MapPut("{id:int}", async (int id, ProdutoRequest req, AppDbContext context) =>
        {
            var produto = await context.Produtos.FindAsync(id);

            if (produto == null) return Results.NotFound();

            produto.ChangeName(req.Nome);
            produto.ChangeCategoria(req.CategoriaId);
            produto.ChangePrice(req.Preco);
            produto.ChangeImagem(req.Imagem);
            await context.SaveChangesAsync();
            return Results.Ok(produto);
        });

        route.MapDelete("{id:int}", async (int id, AppDbContext context) =>
        {
            var produto = await context.Produtos.FindAsync(id);
            if (produto == null) return Results.NotFound();
            context.Produtos.Remove(produto);
            await context.SaveChangesAsync();
            return Results.Ok();
        });
    }
}