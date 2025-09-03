namespace LiberaAPI;

public class ItemVenda
{
    //TODO implement the changeProduto actually changing the produto because now it only changes the ID

    public ItemVenda(int produtoId, int quantidade, decimal precoUnitario)
    {
        ProdutoId = produtoId;
        Quantidade = quantidade;
        PrecoUnitario = precoUnitario;
    }

    public int Id { get; private set; }

    public int VendaId { get; private set; }
    public Venda? Venda { get; private set; }
    public int ProdutoId { get; private set; }
    public Produto? Produto { get; private set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }

    public decimal TotalItem()
    {
        return Quantidade * PrecoUnitario;
    }

    public void ChangeQuantidade(int quantidade)
    {
        Quantidade = quantidade;
    }

    public void ChangePrecoUnitario(decimal precoUnitario)
    {
        PrecoUnitario = precoUnitario;
    }

    public void ChangeProduto(int produtoId)
    {
        ProdutoId = produtoId;
    }
}