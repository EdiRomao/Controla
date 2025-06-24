  function mostrarTermos(event) {
    event.preventDefault();
    document.getElementById("card-termos").classList.remove("d-none");
  }

  function fecharTermos() {
    document.getElementById("card-termos").classList.add("d-none");
  }

