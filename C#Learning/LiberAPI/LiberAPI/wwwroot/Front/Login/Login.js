console.log("Login.js is running!");

$(document).ready(function () {
    // code runs here only after the page’s DOM has finished loading, basically the main function

    //selecting element with id "button", # specifies id
    $("button").click(function () {
        const nome = $("#NomeInput").val().trim();
        const telefone = $("#TelefoneInput").val().trim();

        if (nome == "" || telefone == "") {
            alert("Please fill in inputs!")
            return;
        }

        $.ajax({
            type: "GET",
            url: "/clientes",
            success: function (response) {
                for (const cliente of response) {
                    if (cliente.nome === nome && cliente.telefone === telefone) {
                        console.log("Login aprovado");
                        window.location.href = window.location.href = "/front/MainPage/MainPage.html?nome=" + encodeURIComponent(cliente.nome);
                        return;
                    }
                }
                alert("Login failed, Client does not exist!");
            },
            error: function (xhr) {
                console.error("Error:", xhr.responseText);
            },
        });
    });
});