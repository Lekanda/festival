document.addEventListener('DOMContentLoaded',function () { 
    iniciarApp();
})


function iniciarApp() { 
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    // galeria.textContent = 'Vamos a crear la Galeria';


    for(let i=1; i<=12; i++){
        // console.log(i);

        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        // console.log(imagen);

        // MODO 1
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        // MODO 2
        // imagen.onclick = mostrarImagen;// Esta hace llamar la funcion automaticamente.

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) { 
    // console.log('Mostrando ', i);

    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${i}.avif" type="image/avif">
        <source srcset="build/img/grande/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="imagen galeria">
    `;
    // Crea el overlay con la ventana modal de la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Btn para cerrar la ventana modal (img grande)
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadelo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}