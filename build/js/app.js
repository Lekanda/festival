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

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    
    const body = document.querySelector('body');
    body.appendChild(overlay);
}