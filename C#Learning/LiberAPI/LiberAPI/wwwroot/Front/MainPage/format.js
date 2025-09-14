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
    $(".cart").click(function () {
        window.location.href = "/front/Car/Cart.html";
    });

    const $list = $("#produtosList");


    $.ajax({
        type: "GET",
        url: "/categorias",
        success: function (categorias) {
            const catById = {}; //set
            (categorias || []).forEach(c => { catById[c.id] = c.nome; });

            $.ajax({
                type: "GET",
                url: "/produtos",
                success: function (produtos) {
                    if (!produtos || produtos.length === 0) {
                        return; // nao tem nada
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
                <button 
                class="produtoCart" 
                data-id="${produto.id}"
                data-preco="${produto.preco}"
                type="button">
                Add to cart
                </button>
              </div>
            `;
                        $list.append(card);
                    });

                    //produtoCart button:
                    var firstVenda = true;
                    var currentVendaId = null;
                    const added = new Set(); //criando um set dos produtos ja adicionados pra checar.

                    $(".produtoCart").click(function (e) {
                        const produtoId = $(this).data("id");   //getting produtoId
                        const produtoPreco = $(this).data("preco");
                        const $btn = $(this);
                        var quantidade = 1;


                        if(added.has(produtoId)) {
                            console.log("produto ja adicionado, RETURN");
                            return;
                        }


                        //depois checar se ja existe uma venda, se nao, criar uma,
                        // se sim, add novo produto a lista usando a funcao addItem.

                        $.ajax({
                            type: "GET", //pegando clienteId
                            url: "/clientes",
                            success: function (clientes) {
                                clientes.forEach(cliente => {
                                    if(cliente.nome === nome) {
                                        console.log("Cliente ID:", cliente.id);
                                        clienteId = cliente.id;
                                    }
                                })

                                if(firstVenda === true) {

                                    const payload = {
                                        ClienteId: clienteId,
                                        Itens: [{produtoId,quantidade,produtoPreco}]

                                    }
                                    console.log("payload successful: ", payload);

                                    $.ajax({
                                        type: "POST",
                                        url: "/vendas",
                                        contentType: "application/json",
                                        data: JSON.stringify(payload),
                                        dataType: "json",
                                        success: function (response) {
                                            console.log("venda created:", response);
                                            firstVenda = false;
                                            currentVendaId = response.id;

                                            //disable button
                                            added.add(produtoId);
                                            $btn.text("Added").prop("disabled", true).css({
                                                background: "gray",
                                                cursor: "not-allowed",
                                                opacity: "0.7",
                                            });
                                        },
                                        error: function (xhr) {
                                            console.error("Error:", xhr.responseText);
                                        },
                                    });
                                } else {

                                    const itemPayload = { produtoId, quantidade, produtoPreco };

                                    console.log("payload successful: ", itemPayload);
                                    $.ajax({
                                        type: "PUT",
                                        url: `/vendas/${currentVendaId}/itens`,
                                        contentType: "application/json",
                                        data: JSON.stringify(itemPayload),
                                        dataType: "json",
                                        success: function (response) {
                                            console.log("venda created:", response);
                                            firstVenda = false;

                                            //disable button
                                            added.add(produtoId);
                                            $btn.text("Added").prop("disabled", true).css({
                                                background: "gray",
                                                cursor: "not-allowed",
                                                opacity: "0.7",
                                            });
                                        },
                                        error: function (xhr) {
                                            console.error("Error:", xhr.responseText);
                                        },
                                    });
                                }
                            },
                            error: function (xhr) {
                                console.error("Error fetching cliente by nome:", xhr.responseText);
                            }
                        });
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
