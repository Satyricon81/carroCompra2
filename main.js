const carro = document.querySelector('#carro');
const template = document.querySelector('#template');
const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll('.card .btn');

const carroObjeto = [];

/* Le pasamos "e" y en la constante producto le añadimos target.dataset.fruta que esta relacionado con el data-fruta
que le hemos pasado al button y que nos sirve de identificativo. */
const agregarAlCarro = (e) => {
    const producto = {
        titulo : e.target.dataset.fruta,
        id : e.target.dataset.fruta,
        cantidad : 1,
    };

    const indice = carroObjeto.findIndex((item) => item.id === producto.id);

    console.log(indice);

    if (indice === -1) {
        carroObjeto.push(producto);
    } else {
        carroObjeto[indice].cantidad ++;
    }

    console.log (carroObjeto);
    
    mostrarCarro(carroObjeto);
};

const mostrarCarro = (array) => {

    carro.textContent = "";

    array.forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;

        fragment.appendChild(clone)
    })

    carro.appendChild(fragment);
}

botones.forEach((btn) => btn.addEventListener("click", agregarAlCarro))