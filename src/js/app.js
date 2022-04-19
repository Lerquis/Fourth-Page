document.addEventListener("DOMContentLoaded", function () {
  scrollNav();
  navegacionFija();
});

function navegacionFija() {
  const barra = document.querySelector(".header");
  //Registrar el Intersection Observer
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      //Agarra la info del observer y el .isIntersecting se refiere a si es visible en el monitor
      barra.classList.remove("fijo"); //Para quitar el header de la pantalla
    } else {
      barra.classList.add("fijo"); //Para dejar el header fijo en la pantalla
    }
  });

  //Elemento observar
  observer.observe(document.querySelector(".info")); //Observa y toma como refencia la clase info. De si esta se ve o no
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a"); // querySelectorAll porque son 3 enlaces en este caso
  enlaces.forEach(function (enlace) {
    //Itera por los enlaces
    //Esto se hacer porque un addEventListener no puede estar atado a varios elementos, tiene que ser uno por uno. Por eso se itera la lista de enalces
    enlace.addEventListener("click", function (e) {
      //console.log(e.target.attributes.href.value); Muestra el value del href del elemento
      e.preventDefault(); //Previene que se realice la accion default del boton (Bajar de golpe)
      const seccion = document.querySelector(e.target.attributes.href.value); //Seccion = al id del enlace
      seccion.scrollIntoView({ behavior: "smooth" }); // Para anadir la animacion del scroll
    });
  });
}
