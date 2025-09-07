// for each element that is fetched use this svg file:

//<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg>
$(document).ready(function() {

    //create editing button that appears if list is not null
    
    $.ajax({
        type: "GET",
        url: "/clientes",
        success: function (clientes) {
            const $list = $(".clientes_list");
            $list.empty();
            
            clientes.forEach(function (cliente){
                const card = `
                <div class="clienteCard>
                    <div class="clienteBody">
                    <p><strong>Id:</strong> ${cliente.id}</p>
                    <p><strong>Name:</strong> ${cliente.nome}</p>
                    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                    </div>
                </div> `
                $list.append(card);
            });
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
        },
    });

    $.ajax({
        type: "GET",
        url: "/Produtos",
        success: function (produtos) {
            const $list = $(".produtos_list");
            $list.empty();

            produtos.forEach(function (produto){
                const card = `
                <div class="produtosCard>
                    <div class="produtosBody">
                    <p><strong>Id:</strong> ${produto.id}</p>
                    <p><strong>Name:</strong> ${produto.nome}</p>
                    <p><strong>Categoria:</strong> ${produto.categoriaId}</p>
                    <p><strong>preco:</strong> ${produto.preco}</p>
                    <p><strong>Imagem:</strong> ${produto.imagem}</p>
                    </div>
                </div> `
                $list.append(card);
            });
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
        },
    });

    $.ajax({
        type: "GET",
        url: "/categorias",
        success: function (categorias) {
            const $list = $(".categorias_list");
            $list.empty();

            categorias.forEach(function (categoria){
                const card = `
                <div class="categoria_card>
                    <div class="categoriaBody">
                    <p><strong>Id:</strong> ${categoria.id}</p>
                    <p><strong>Name:</strong> ${categoria.nome}</p>
                    </div>
                </div> `
                $list.append(card);
            });
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
        },
    });
    
    //////////BUTTONS
    
    //Back button
    $(".backButton").click(function() {
        window.location.href = "/front/Login/Login.html";
    })
        
//Modal buttons    
    
    //Cliente buttons
    $(".addCliente").click(function() {
        const clienteDialog = document.getElementById("clienteDialog");
        clienteDialog.showModal();
    })
    
    $(".removeCliente").click(function() {
        const clienteDelete = document.getElementById("clienteDelete");
        clienteDelete.showModal();
    })

    //Produtos buttons
    $(".addProduto").click(function() {
        const produtoDialog = document.getElementById("produtoDialog");
        produtoDialog.showModal();
    })

    $(".removeProduto").click(function() {
        const produtoDelete = document.getElementById("produtoDelete");
        produtoDelete.showModal();
    })
    
    //Categorias buttons
    $(".addCategoria").click(function() {
        const categoriaDialog = document.getElementById("categoriaDialog");
        categoriaDialog.showModal();
    })
    
    $(".removeCategoria").click(function() {
        const categoriaDelete = document.getElementById("categoriaDelete");
        categoriaDelete.showModal();
    })
    
            //ACTUAL CREATE BUTTONS
    
            $("#createC").click(function() {
                const nome = $("#textC").val().trim();
                const telefone = $("#numC").val().trim();

                const payload = {
                    nome: nome,
                    telefone: telefone,
                };

                $.ajax({
                    type: "POST",
                    url: "/clientes",
                    contentType: "application/json",
                    data: JSON.stringify(payload),
                    dataType: "json",
                    success: function (response) {
                        console.log("Cliente created:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    },
                });
                
            })

            $("#createP").click(function() {
                const nome = $("#textP").val().trim();
                const categoriaId = $("#numP").val().trim();
                const preco = parseFloat($("#num2P").val().replace(',', '.'));
                const imagem = $("#imagemInp").val().trim();

                const payload = {
                    nome: nome,
                    categoriaId: categoriaId,
                    preco: preco,
                    imagem: imagem,
                };
                                            
                $.ajax({
                    type: "POST",
                    url: "/produtos",
                    contentType: "application/json",
                    data: JSON.stringify(payload),
                    dataType: "json",
                    success: function (response) {
                        console.log("Produto created:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    },
                });
            })
        
            $("#createCat").click(function() {
                const nome = $("#textCat").val().trim();
                
                const payload = {
                    nome: nome,
                };

                $.ajax({
                    type: "POST",
                    url: "/categorias",
                    contentType: "application/json",
                    data: JSON.stringify(payload),
                    dataType: "json",
                    success: function (response) {
                        console.log("Categoria created:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    },
                });
                
            })
    
            //ACTUAL DELETE BUTTONS

            $("#deleteC").click(function() {
                const id = $("#delInputC").val().trim();
                
                $.ajax({
                    type: "DELETE",                         
                    url: `/clientes/${id}`,
                    success: function (response) {
                        console.log("Cliente Deleted:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    }
                });
            })
        
            $("#deleteP").click(function() {
                const id = $("#delInputP").val().trim();
                
                $.ajax({
                    type: "DELETE",
                    url: `/produtos/${id}`,
                    success: function (response) {
                        console.log("Cliente Deleted:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    }
                });
            })
        
            $("#deleteCat").click(function() {
                const id = $("#delInputCat").val().trim();

                $.ajax({
                    type: "DELETE",
                    url: `/categorias/${id}`,
                    success: function (response) {
                        console.log("Cliente Deleted:", response);
                    },
                    error: function (xhr) {
                        console.error("Error:", xhr.responseText);
                    }
                });
            })
            
    //cancel button
    
    $(document).on('click', '.cancel', function () {
        const dlg = $(this).closest('dialog').get(0);
        if (dlg && typeof dlg.close === 'function') dlg.close();  // <-- lowercase close()
    });

})
    
