document.addEventListener("DOMContentLoaded", function () {
    let btnSubir = document.getElementById("btnSubir");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) { // Muestra el botón después de un desplazamiento de 300px
        btnSubir.style.display = "block";
      } else {
        btnSubir.style.display = "none";
      }
    });
  
    btnSubir.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }); 