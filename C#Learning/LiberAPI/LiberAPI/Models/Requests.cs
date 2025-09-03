namespace LiberAPI.Models;

public record ClienteRequest(string Nome, string Telefone);

public record CategoriaRequest(string Nome);

public record ProdutoRequest(string Nome, decimal Preco, int CategoriaId);

public record VendaRequest(int ClienteId, List<ItemVendaRequest> Itens);

public record ItemVendaRequest(int ProdutoId, int Quantidade, decimal? PrecoUnitario);