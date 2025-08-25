using System;

namespace LiberaAPI
{
    public class Cliente(String nome, String telefone)
    {
        public int Id { get; private set; }
        public String Nome { get; private set; } = null!; 
        //null! used to silence warning meaning that this is assigned as null now but will be set to a real value before anyone uses it
        public String Telefone { get; private set; } = null!;
        
        public void ChangeName(string name) => this.Nome = name;
        public void ChangeTelefone(string name) => this.Telefone = telefone;
        
    }
}
