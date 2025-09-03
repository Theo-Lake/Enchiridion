namespace LiberaAPI;

public class Cliente
{
    public Cliente(string nome, string telefone)
    {
        Nome = nome;
        Telefone = telefone;
    }

    public int Id { get; private set; }

    public string Nome { get; private set; }

    //null! used to silence warning meaning that this is assigned as null now but will be set to a real value before anyone uses it
    public string Telefone { get; private set; }

    public void ChangeName(string nome)
    {
        Nome = nome;
    }

    public void ChangeTelefone(string telefone)
    {
        Telefone = telefone;
    }
}