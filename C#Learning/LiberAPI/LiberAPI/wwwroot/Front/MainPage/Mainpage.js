$(document).ready(function () {

    $(function () {
        const params = new URLSearchParams(location.search);
        const nome = params.get("nome");
        if (nome) {
            $("#nomePlaceholder").text(nome);
        } else {
            alert("Nome does not exist!");
        }
    });

    //cart button
    $("#cart").click(function () {
        console.log("Jumping to cart!");
        window.location.href = "/front/Cart/Cart.html";
    })

    const $list = $("#produtosList");

    $.ajax({
        type: "GET",
        url: "/produtos",
        success: function (produtos) {
            if (!produtos || produtos.length == 0) {
                $list.empty();
                return;
            }
            produtos.forEach(produto => {
                $list.append(`
                    <div class="produto_card">
                        <img src="${produto.imagem || 'https://via.placeholder.com/200x150'}" alt="${produto.nome}">
                        <div class="produto_info">
                            <h3 class="produto_nome">${produto.nome}</h3>
                            <p class="produto_preco">R$ ${Number(produto.preco).toFixed(2)}</p>
                        </div>
                    </div>
                `);
            })
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
        },
    });

});