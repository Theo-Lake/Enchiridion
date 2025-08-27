using System;

namespace LiberaAPI
{
    public class Cliente
    {
        public int Id { get; private set; }
        public String Nome { get; private set; }  
        //null! used to silence warning meaning that this is assigned as null now but will be set to a real value before anyone uses it
        public String Telefone { get; private set; }
        
        public void ChangeName(string nome) => this.Nome = nome;
        public void ChangeTelefone(string telefone) => this.Telefone = telefone;

        public Cliente(String nome, String telefone)
        {
            this.Nome = nome;
            this.Telefone = telefone;
        }
        
    }
}
