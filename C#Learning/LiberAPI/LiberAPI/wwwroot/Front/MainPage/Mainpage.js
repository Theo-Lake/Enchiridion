//-------------------------FUNCTIONS

// Load categories function
function getCat(catById) {
    $.ajax({
        type: "GET",
        url: "/categorias",
        success: function (categorias) {
            (categorias || []).forEach(c => {
                catById[c.id] = c.nome;
            });
        },
        error: function (error) {
            console.log("Couldn't load categorias", error.responseText);
        }
    });
}

// Load products function
function loadProdutos(catById, $list) {
    $.ajax({
        type: "GET",
        url: "/produtos",
        success: function (produtos) {
            if (!produtos || produtos.length === 0) {
                return; // não tem nada
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
                        <button class="produtoCart" 
                                data-id="${produto.id}"
                                data-preco="${produto.preco}"
                                type="button">
                            Add to cart
                        </button>
                    </div>
                `;
                $list.append(card);
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
    const added = new Set();
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

    const catById = {};

    // Get clienteId first, then load products and categories
    getClienteId(nome, function(retrievedId) {
        if (!retrievedId) {
            alert("Cliente not found!");
            return;
        }

        clienteId = retrievedId;
        getCat(catById);
        loadProdutos(catById, $list);
    });

    // Cart button click handler
    $(".cart").click(function () {
        window.location.href = "/front/Cart/Cart.html?nome=" + encodeURIComponent(nome);
    });

    // Product Cart button click handler (using event delegation)
    $(document).on("click", ".produtoCart", function () {
 
        if (!clienteId) {
            alert("Please wait, client data is still loading...");
            return;
        }

        const produtoId = $(this).data("id");
        const produtoPreco = $(this).data("preco");
        const $btn = $(this);
        let quantidade = 1;

        if (added.has(produtoId)) {
            // IF produto was already added
            quantidade++;
            const itemPayload = { produtoId, quantidade, produtoPreco };

            $.ajax({
                type: "PUT", 
                url: "/vendas", //problema aqui, tenho quase ctz q precisa fzr um loop pra procurar a venda
                contentType: "application/json",
                data: JSON.stringify(itemPayload),
                dataType: "json",
                success: function (response) {
                    console.log("Item updated:", response);
                    $btn.text("Added " + quantidade);
                },
                error: function (error) {
                    console.error("Error:", error.responseText);
                }
            });

        } else {
            // IF IT WASN'T ADDED
            const payload = {
                ClienteId: clienteId,
                Itens: [{ produtoId, quantidade, produtoPreco }]
            };

            // POSTING PRODUTO
            $.ajax({
                type: "POST",
                url: "/vendas",
                contentType: "application/json",
                data: JSON.stringify(payload),
                dataType: "json",
                success: function (response) {
                    console.log("Venda created:", response);
                    added.add(produtoId);
                    $btn.text("Added " + quantidade);
                },
                error: function (xhr) {
                    console.error("Error:", xhr.responseText);
                }
            });
        }
        return false;
    });
});