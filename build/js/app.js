document.addEventListener('DOMContentLoaded',function () { 
    iniciarApp();
})


function iniciarApp() { 
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    // selecciona la barra
    const barra = document.querySelector('.header');
    // Elemento donde aparece la barra de arriba. el que marca la posicion del scroll.
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function () { 
        // console.log(sobreFestival.getBoundingClientRect());

        if(sobreFestival.getBoundingClientRect().bottom < 0){
            // console.log('Ya paso el elemento');
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            // console.log('Aun no paso el elemento');
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault(); // Quita comportamiento por default.
            // console.log(e.target.attributes.href.value);
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({behavior:'smooth'});
        });
    
    })
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
