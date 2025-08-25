using System;
using System.Runtime.CompilerServices;
using LiberaAPI;

namespace LiberAPI
{
    public class Categoria(String Nome)
    {
        //Nao e melhor so criar uma lista de strings
        
        public int Id {get; private set;}
        public String Nome {get; set;}
        
        public ICollection<Produto> Produtos {  get; } = new List<Produto>();
        //used to make a list of products from Categorias and create that list whenever class is instantiated
       
        public void ChangeCategoria(String nome) => this.Nome = nome;
    }
}
