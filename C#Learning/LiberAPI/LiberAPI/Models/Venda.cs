using System;
using System.Diagnostics.CodeAnalysis;
using LiberAPI.Models;

namespace LiberaAPI
{
    public class Venda
    {
        public int Id {  get; private set; }
        
        public int ClienteId {  get; private set; }
        public Cliente? Cliente {  get; set; }

        public ICollection<ItemVenda> Itens { get; } = new List<ItemVenda>();
        
        public decimal Total() => Itens.Sum(i => i.TotalItem());
        
        /*                                                ↑
         public decimal Total()                 Comprehension of method
         {                                                ↑
             decimal sum = 0;                             |
             foreach (ItemVenda item in Itens)  ----------|
             {
                 sum += item.TotalItem();
             }
             return sum;
         } */

        public void AddItem(int produtoId, int quantidade, decimal precoUnitario)
        {
            if(quantidade <= 0) throw new ArgumentException("Quantidade deve ser maior que 0");
            if(precoUnitario <= 0) throw new ArgumentException("PrecoUnitario deve ser maior que 0");
            Itens.Add(new ItemVenda(produtoId,quantidade,precoUnitario));
        }

        public Venda(int ClienteId)
        {
            this.ClienteId = ClienteId;
        }
    }
}

