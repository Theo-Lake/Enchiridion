using LiberaAPI;
using Microsoft.EntityFrameworkCore;

namespace LiberAPI.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<ItemVenda> ItemVendas { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Venda> Vendas { get; set; } //creating the table for venda entity which will hold the vendas.

        protected override void OnModelCreating(ModelBuilder model)
        {
            model.Entity<Venda>().HasMany(v => v.Itens).WithOne(i => i.Venda)
                .HasForeignKey(i => i.VendaId).OnDelete(DeleteBehavior.Cascade);

            model.Entity<ItemVenda>().HasOne(i => i.Produto).WithMany()
                .HasForeignKey(i => i.ProdutoId).OnDelete(DeleteBehavior.Restrict);
            //restrict is used so that it refuses to delete if any itemVenda references the product.
            //cascade would delete ALL itemVendas that referenced it
            //WithMany() is empty because loading all itens for produto is not needed so it makes the domain simpler

            /*the .s are very literal here, just indicating that venda has many vendas where each venda has
            one itens, and uses a foreign key to identify the itens which is VendaID, and on delete it deletes itemVenda too
            which is called "cascading" */

            model.Entity<Produto>().Property(p => p.Preco).HasPrecision(18, 2);
            model.Entity<ItemVenda>().Property(i => i.PrecoUnitario).HasPrecision(18, 2);
            //SQL doesnt enforce decimal precision, so due to decimal type choice, a decimal "mapper" is needed

            model.Entity<ItemVenda>().HasIndex(i => i.VendaId);
            model.Entity<ItemVenda>().HasIndex(i => i.ProdutoId);
            //indexes itens of a given venda so that it can be easly fetched through large datasets
            //same for produto

            //this model is basically a mask, to fit the requirable needs of the user.

        }
    }
}


//DB context is the database context and DbSet<T> creates the table for the models in the database.