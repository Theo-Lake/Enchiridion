using LiberAPI;

namespace LiberaAPI;

public class Produto
{
    //TODO implement the changeCategoria actually changing the categoria because now it only changes the ID

    public Produto(string nome, int categoriaId, decimal preco, string imagem)
    {
        Nome = nome;
        CategoriaId = categoriaId;
        Preco = preco;
        Imagem = imagem;
    }

    public int Id { get; private set; }
    public string Nome { get; set; }
    public int CategoriaId { get; private set; } //used to load a categoria without having to load whole object
    public Categoria? Categoria { get; set; }
    public decimal Preco { get; set; }
    
    public string Imagem { get; set; }

    public void ChangePrice(decimal preco)
    {
        Preco = preco;
    }

    public void ChangeName(string nome)
    {
        Nome = nome;
    }

    public void ChangeCategoria(int categoriaId)
    {
        CategoriaId = categoriaId;
    }

    public void ChangeImagem(string imagem)
    {
        Imagem = imagem;
    }
}