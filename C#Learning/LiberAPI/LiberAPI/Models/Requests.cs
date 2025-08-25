using LiberaAPI;

namespace LiberAPI.Models;

public record ClienteRequest(String Nome, String Telefone);
public record CategoriaRequest(String Nome);
public record ProdutoRequest(String Nome, Decimal Preco, int CategoriaId);
public record VendaRequest(int ClienteId, List<ItemVendaRequest> Itens);
public record ItemVendaRequest(int ProdutoId, int Quantidade, decimal? PrecoUnitario);
