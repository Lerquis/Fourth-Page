document.addEventListener("DOMContentLoaded", function () {
  crearGaleria();
});

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes"); //Selecciona el elemento "galeria-imagenes" del html

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("IMG"); //Crea un elemento img
    imagen.src = `build/img/thumb/${i}.webp`; //Obtiene la ruta de la imagen. Se hace con ` ` para poder utilizar variables mediante el ${}
    imagen.dataset.imagenId = i; //Le agrega el numero i como Id a la imagen

    //Se agrega la funcion de mostarImagen
    imagen.onclick = mostrarImagen;

    const lista = document.createElement("LI"); //Crea elemento lista
    lista.appendChild(imagen); //Se agregan las imagenes a la lista
    galeria.appendChild(lista); //Se muestra en el codigo html
  }
}

function mostrarImagen(e) {
  //e de parametro = Evento
  //e.target = el evento es el click y el target es la imagen. Entonces devuelve los datos de la imagen que se le dio click
  //e.target.dataset = devuelve el Id que se agrego antes
  //e.target.dataset.imagenId = devuelve solamente el numero
  //console.log(e.target.dataset.imagenId);
  const id = parseInt(e.target.dataset.imagenId); //Pasar la string de Id a numero
  //Genera la imagen
  const imagen = document.createElement("IMG");
  imagen.src = `build/img/grande/${id}.webp`;
  const body = document.querySelector("body");
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay"); //Agrega una clase "overlay" al div

  //Cuando se da click afuera de la imagen
  overlay.onclick = function () {
    overlay.remove();
    body.classList.remove("fijar-body"); // Para quitar el efecto de que no deje dar scroll
  };
  //Boton para cerrar la imagen
  const cerrarImagen = document.createElement("P");
  cerrarImagen.textContent = "X";
  cerrarImagen.classList.add("btn-cerrar");
  //Cuando se presiona, se cierra la imagen
  cerrarImagen.onclick = function () {
    overlay.remove();
    body.classList.remove("fijar-body"); // Para quitar el efecto de que no deje dar scroll
  };
  overlay.appendChild(cerrarImagen);
  //Mostar en el html
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
