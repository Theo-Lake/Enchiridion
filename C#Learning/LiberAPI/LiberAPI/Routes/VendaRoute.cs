using LiberaAPI;
using LiberAPI.Data;
using LiberAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LiberAPI.Routes;

public static class VendaRoute
{
    public static void MapVendas(this WebApplication app)
    {
        var route = app.MapGroup("/vendas");
        
        route.MapPost("", async (VendaRequest req, AppDbContext context) =>
        {
            //Guard clauses

            if (req.Itens is null || req.Itens.Count == 0) 
                return Results.BadRequest("Venda precisa ter no minimo 1 item");
            if(req.Itens.Any(i => i.Quantidade <= 0))
                return Results.BadRequest("Quantidade deve ser maior que 0");

            var clienteOk = await context.Clientes.AsNoTracking().AnyAsync(c => c.Id == req.ClienteId);
            if (!clienteOk) return Results.BadRequest("Cliente inválido.");
            //context.Clientes represents the clientes table in the database, AsNoTracking is used for performance optimization
            //to only the existance of clientes, and not the whole cliente entity.
            // AnyAsync is used to return true if any row matches the preditace (parameter inside) otherwise false.
            // and the if statement validates the bool value and returns invalid client if false.

            var ids = req.Itens.Select(i => i.ProdutoId).Distinct().ToList();
            //i => i.produtoId projects list into a sequence of product Ids, Distinct removes duplicates,
            // and ToList turns them into a concrete list, basically a set, though indexed.
            
            var produtos = await context.Produtos.AsNoTracking()
                .Where(p => ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id);
            // This creates a dictionary keyed by the product id, and valued with produto objects
            
            /*
             [10] = Produto { Id = 10, Nome = "Mouse", Preco = 50.00 },
            [20] = Produto { Id = 20, Nome = "Teclado", Preco = 100.00 }

             something like this where a list of product ids exist like: produtoIds = [10,20]
             */
            if (produtos.Count != ids.Count) return Results.BadRequest("Um ou mais produtos nao existem");
            
            var venda = new Venda(req.ClienteId); //creating new venda object tied to specific cliente
            foreach (var i in req.Itens) //looping through request items
            {
                var preco = i.PrecoUnitario ?? produtos[i.ProdutoId].Preco;
                // preco = preco unitario if it was provided in the request, if not use default price in dictionary
                if(preco <= 0) return Results.BadRequest("Preco unitario nao pode ser <= 0");
                venda.AddItem(i.ProdutoId, i.Quantidade, preco);
                //then adds item into itens.
            }
            
            await context.Vendas.AddAsync(venda); //adding venda into its table
            await context.SaveChangesAsync();       //saving changes

            var res = new
            {
                venda.Id,
                venda.ClienteId,
                Total = venda.Itens.Sum(x => x.Quantidade * x.PrecoUnitario),
                Itens = venda.Itens.Select(i => new
                {
                    i.ProdutoId, i.Quantidade, i.PrecoUnitario,
                    Total = i.Quantidade * i.PrecoUnitario
                })

            };
            // creating a brand new object, with anonymous type, so the response is formatted better,
            // and looks more understandable and sleek.
            
            return Results.Created($"/vendas/{venda.Id}", venda);
            
        });
                        //{id: int} is a route parameter constraint, to indicate that an id is needed to get, put or delete
        route.MapGet("", async (AppDbContext context) =>
        {
            var vendas = await context.Vendas.Include(v => v.Itens).Select(v => new
            {
                v.Id,
                v.ClienteId,
                Total = v.Itens.Sum(x => x.Quantidade * x.PrecoUnitario),
                Itens = v.Itens.Select(i => new
                {
                    i.ProdutoId, i.Quantidade, i.PrecoUnitario,
                    Total = i.Quantidade * i.PrecoUnitario
                })
                    })
                .ToListAsync();
            return Results.Ok(vendas);
        });
        // This is just getting all the values and returning them with the brand new object format from before, with anonymous type,
        // so the response is formatted better, and looks more understandable and sleek.

        route.MapPut("{id:int}", async (int id, VendaRequest req, AppDbContext context) =>
        {
            var venda = await context.Vendas.Include(v => v.Itens).FirstOrDefaultAsync(v => v.Id == id);
            if (venda is null) return Results.NotFound();
            
            if (req.Itens is null || req.Itens.Count == 0)
                return Results.BadRequest("Venda precisa ter ao menos 1 item.");
            if (req.Itens.Any(i => i.Quantidade <= 0))
                return Results.BadRequest("Todo item deve ter quantidade > 0.");
            //Guard clauses
            
            var clienteOk = await context.Clientes.AsNoTracking().AnyAsync(c => c.Id == req.ClienteId);
            if (!clienteOk) return Results.BadRequest("Cliente inválido.");
            
            var ids = req.Itens.Select(i => i.ProdutoId).Distinct().ToList();
            var produtos = await context.Produtos.AsNoTracking()
                .Where(p => ids.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);
            if (produtos.Count != ids.Count)
                return Results.BadRequest("Um ou mais produtos não existem.");
            
            //basically same process as post
            
            typeof(Venda).GetProperty("ClienteId")!.SetValue(venda, req.ClienteId); // or venda.ChangeCliente(...)
            context.RemoveRange(venda.Itens);
            venda.Itens.Clear();
            
            //gets the type metadata for venda class and looks up property definition (clienteID) ! is used 
            //eto state that "im sure its not null" or a null-forgiving operator. Setvalue is to set the value of
            //the object venda at runtime.
            
            foreach (var i in req.Itens) //looping through request items
            {
                var preco = i.PrecoUnitario ?? produtos[i.ProdutoId].Preco;
                // preco = preco unitario if it was provided in the request, if not use default price in dictionary
                if(preco <= 0) return Results.BadRequest("Preco unitario nao pode ser <= 0");
                venda.AddItem(i.ProdutoId, i.Quantidade, preco);
                //then adds item into itens.
            }
            //exactly same as before
            
            await context.SaveChangesAsync();
            
            var res = new {
                venda.Id,
                venda.ClienteId,
                Total = venda.Itens.Sum(x => x.Quantidade * x.PrecoUnitario),
                Itens = venda.Itens.Select(x => new {
                    x.ProdutoId, x.Quantidade, x.PrecoUnitario,
                    Total = x.Quantidade * x.PrecoUnitario
                })
            };
            //again the formatter...
            return Results.Ok(res);
            
            
        });

        route.MapDelete("{id:int}", async (int id, AppDbContext context) =>
        {
            var venda = await context.Vendas.FindAsync(id);
            //searching for venda in database
            
            if (venda is null) return Results.NotFound(); //if not found return 404 error
            
            context.Vendas.Remove(venda);
            //removing (cascading feature removes the rest)
            await context.SaveChangesAsync();
            
            return Results.NoContent();
            //return 204 after no content, which means delete was a success

        });
    }
    
}