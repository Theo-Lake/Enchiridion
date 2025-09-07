$(document).ready(function () {
    // read ?nome=...
    const params = new URLSearchParams(location.search);
    const nome = params.get("nome");
    if (nome) {
        $("#nomePlaceholder").text(nome);
    } else {
        alert("Nome does not exist!");
    }

    // cart button
    $("#cart").click(function () {
        window.location.href = "/front/Car/Cart.html";
        //TODO NOT WORKING
    });

    const $list = $("#produtosList");

    // 1) fetch all categories, build a map id -> nome
    $.ajax({
        type: "GET",
        url: "/categorias",
        success: function (categorias) {
            const catById = {};
            (categorias || []).forEach(c => { catById[c.id] = c.nome; });

            // 2) then fetch products
            $.ajax({
                type: "GET",
                url: "/produtos",
                success: function (produtos) {
                    $list.empty();

                    if (!produtos || produtos.length === 0) {
                        return; // nothing to render
                    }

                    produtos.forEach(produto => {
                        const img = produto.imagem && produto.imagem.trim()
                            ? produto.imagem
                            : "https://via.placeholder.com/200x150";

                        // produto.preco can be string/number; coerce safely
                        const preco = Number(produto.preco);
                        const precoFmt = Number.isFinite(preco) ? preco.toFixed(2) : produto.preco;

                        const catNome = catById[produto.categoriaId] || produto.categoriaId || "—";

                        const card = `
              <div class="produtoCard">
              <div class="pCardContent">
                <img src="${img}" alt="${produto.nome} imagem">
                <h3 class="produtoNome">${produto.nome}</h3>
                <div class="produtoInfo">
                  <p class="produtoPreco">R$ ${precoFmt}</p>
                  <p class="categoria">Categoria: ${catNome}</p>
                </div>
                </div>
                <button class="produtoCart">Add to cart</button>
              </div>
            `;
                        $list.append(card);
                    });
                    
                    //produtoCart button:
                    firstVenda = true;
                    
                    $(".produtoCart").click(function () {
                        //Primeira coisa e pegar o ID do produto que apertou o botao,
                        //depois checar se ja existe uma venda, se nao, criar uma,
                        // se sim, add novo produto a lista usando a funcao addItem.
                        
                         if(firstVenda === true) {
                             $.ajax({
                                 type: "POST",
                                 url: "/vendas",
                                 contentType: "application/json",
                                 data: JSON.stringify(payload),
                                 dataType: "json",
                                 success: function (response) {
                                     console.log("venda created:", response);
                                     firstVenda = false;
                                 },
                                 error: function (xhr) {
                                     console.error("Error:", xhr.responseText);
                                 },
                             });
                         } else {
                             $.ajax({
                                 type: "PUT",
                                 url: "/vendas",
                                 contentType: "application/json",
                                 data: JSON.stringify(payload),
                                 dataType: "json",
                                 success: function (response) {
                                     console.log("venda created:", response);
                                     firstVenda = false;
                                 },
                                 error: function (xhr) {
                                     console.error("Error:", xhr.responseText);
                                 },
                             });
                         }
                    })
                    
                    
                },
                error: function (xhr) {
                    console.error("Error loading produtos:", xhr.responseText);
                },
            });
        },
        error: function (xhr) {
            console.error("Error loading categorias:", xhr.responseText);
        },
    });
    
    
    
});
