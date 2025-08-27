using System;
using System.Runtime.CompilerServices;
using LiberaAPI;

namespace LiberAPI
{
    public class Categoria
    {
        //Nao e melhor so criar uma lista de strings
        
        public int Id {get; private set;}
        public String Nome {get; set;}
       
        public void ChangeCategoria(String nome) => this.Nome = nome;

        public Categoria(String nome)
        {
            this.Nome = nome;
        }
    }
}
