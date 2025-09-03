namespace LiberAPI;

public class Categoria
{
    public Categoria(string nome)
    {
        Nome = nome;
    }
    //Nao e melhor so criar uma lista de strings

    public int Id { get; private set; }
    public string Nome { get; set; }

    public void ChangeCategoria(string nome)
    {
        Nome = nome;
    }
}