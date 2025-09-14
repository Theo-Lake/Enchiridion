//-------------------------FUNCTIONS

function getCat(categoriaId,categoria) {
    $.ajax({
        type: "GET",
        url: "/categorias",
        success: function (categorias) {
            categorias.forEach(cat => {
                if(categoria.id != categoriaId) {
                    return;
                }
                categoria = categoria.name;
            })
        },
        error: function (error) {
            console.log("Couldn't load categorias", error.responseText);
        }
    });
}

function getProduto(produtoId, categoria, img){
    $.ajax({
        type: "GET",
        url: "/produtos",
        success: function (produtos) {
            if (!produtos || produtos.length === 0) {
                return; // não tem nada
            }
            
            produtos.forEach(produto => {
                if(produto.id !=produtoId){
                    return;
                }
                
                getCat(produto.categoriaId,categoria);
                img = produto.imagem;
            })
        }
    });
}

// Load products function
function loadVenda(clienteId, $list) {   //TODO nao ta funcionando
    $.ajax({
        type: "GET",
        url: "/vendas",
        success: function (vendas) {
            if (!vendas || vendas.length === 0) {
                return; // não tem nada
            }

            vendas.forEach(venda => {
                if(venda.ClienteId != clienteId) {
                    return; //if cliente id is not correct go to next venda
                }
                
                venda.Itens.forEach((item) => {
                    
                    let categoria = null;
                    let img = null;

                    getProduto(item.produtoId,categoria,img);
                    
                    const card = `
                    <div class="cart-item" data-id="${item.produtoId}">
                        <div class="item-content">
                            <div class="item-image">
                                <img src="${img}" alt="${item.nome}">
                            </div>
                            
                            <div class="item-details">
                                <h2 class="item-title">${item.nome}</h2>
                                <p class="item-category">${categoria}</p>
                                
                                <div class="quantity-controls">
                                    <label>Quantidade:</label>
                                    <div class="quantity-buttons">
                                        <button type="button" class="quantity-btn remove-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg>
                                        </button>
                                        <span class="quantity-value">${item.quantidade}</span>
                                        <button type="button" class="quantity-btn add-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="item-actions">
                                    <button class="action-btn delete-btn" data-id="${item.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                            
                            <div class="item-pricing">
                                <div class="price">R$ ${item.preco}</div>
                            </div>
                        </div>
                    </div>
                `;
                    $list.append(card);
                });
                
                $(".Subtotal").append("R$ " + venda.Total());    //adicionando subtotal funcao que tem no modelo venda.
                                                                //TODO nao ta funcionando
            });
        },
        error: function (error) {
            console.log("Couldn't load produtos", error.responseText);
        }
    });
}

// Get clienteId function with callback
function getClienteId(nome, callback) {
    $.ajax({
        type: "GET",
        url: "/clientes",
        success: function (clientes) {
            let foundId = null;
            clientes.forEach(cliente => {
                if (cliente.nome === nome) {
                    console.log("Cliente ID:", cliente.id);
                    foundId = cliente.id;
                }
            });
            callback(foundId);
        },
        error: function(error) {
            console.log("Error, cliente not found: ", error.responseText);
            callback(null);
        }
    });
}

//--------------------------END OF FUNCTIONS

$(document).ready(function () {

    // Global variables
    const $list = $("#produtosList");
    let clienteId = null;

    // Fetching nome from URL parameters
    const params = new URLSearchParams(location.search);
    const nome = params.get("nome");

    if (nome) {
        $("#nomePlaceholder").text(nome);
    } else {
        alert("Nome does not exist!");
        return;
    }

    // Get clienteId first, then load products and categories
    getClienteId(nome, function (retrievedId) {
        if (!retrievedId) {
            alert("Cliente not found!");
            return;
        }

        clienteId = retrievedId;
        loadVenda($list);
    });

    //backbutton
    
    $(".backButton").click(function () {
        window.location.href = "/front/MainPage/MainPage.html?nome=" + encodeURIComponent(nome);
    })
});

//TODO fazer q card aumenta com mais produtos adicionados.