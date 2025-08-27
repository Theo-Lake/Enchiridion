using LiberAPI;
using System;

namespace LiberaAPI
{
    public class Produto
    {
        public int Id { get; private set; }
        public String Nome { get; set; }
        public int CategoriaId {get; private set;} //used to load a categoria without having to load whole object
        public Categoria? Categoria { get; set; }
        public decimal Preco { get; set; }

        public void ChangePrice(decimal preco)=> this.Preco = preco;
        public void ChangeName(String nome)=> this.Nome = nome;
        public void ChangeCategoria(int categoriaId) => this.CategoriaId = categoriaId; 
        
        //TODO implement the changeCategoria actually changing the categoria because now it only changes the ID

        public Produto(String nome, int categoriaId, decimal preco)
        {
            this.Nome = nome;
            this.CategoriaId = categoriaId;
            this.Preco = preco;
        }
    }
}
