console.log("CriarC.js is running!");

$(document).ready(function () {
  // code runs here only after the page’s DOM has finished loading, basically the main function

  //selecting element with id "button", # specifies id
  $("button").click(function () {
    const nome = $("#NomeInput").val().trim();
    const telefone = $("#TelefoneInput").val().trim();

      if(nome == "" || telefone == ""){
          alert("Please fill in inputs!")
          return;
      }

      $.ajax({
          type: "GET",
          url: "/clientes",
          success: function (response) {
              for(const cliente of response){
                  if(cliente.nome === nome || cliente.telefone === telefone){
                      console.log("Login aprovado");
                      alert("Cliente ou numero ja existe")
                      return;
                  }
              }
          },
          error: function (xhr) {
              console.error("Error:", xhr.responseText);
          },
      });
      
      //TODO create if name or telefone already exists

    // creating the variables that will fetch the inputfields inputs

    const payload = {
      nome: nome,
      telefone: telefone,
    };

    //creating payload object for JSON

    $.ajax({
      type: "POST",
      url: "/clientes", 
      contentType: "application/json",
      data: JSON.stringify(payload),
      dataType: "json",
      success: function (response) {
        console.log("Cliente created:", response);
        //redirect to another page
        window.location.href = "/front/MainPage/MainPage.html?nome=" + encodeURIComponent(cliente.nome);
      },
      error: function (xhr) {
        console.error("Error:", xhr.responseText);
      },
    });
  });
});
