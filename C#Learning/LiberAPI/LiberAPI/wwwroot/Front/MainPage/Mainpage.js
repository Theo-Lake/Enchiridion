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
    
    $("#cart").click(function () {
        //entrar nas minhas vendas page
    })
    
    
});