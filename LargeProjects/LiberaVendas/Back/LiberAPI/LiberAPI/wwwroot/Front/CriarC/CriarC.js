$(document).ready(function () {
  // code runs here only after the page’s DOM has finished loading, basically the main function

  //selecting element with id "button", # specifies id
  $("#button").click(function () {
    const nome = $("#NomeInput").val().trim();
    const telefone = $("#TelefoneInput").val().trim();

    // creating the variables that will fetch the inputfields inputs

    const payload = {
      nome: nome,
      telefone: telefone,
    };

    //creating payload object for JSON

    $.ajax({
      type: "POST",
      url: "/clientes",
      data: JSON.stringify(payload),
      dataType: "json",
      success: function (response) {
        console.log("Cliente created:", response);
        //redirect to another page
        window.location.href = "/mainPage/mainPage.html";
      },
      error: function (xhr) {
        console.error("Error:", xhr.responseText);
      },
    });
  });
});
