const carro = document.querySelector('#carro');
const template = document.querySelector('#template');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('templateFooter');
const fragment = document.createDocumentFragment();

//Añadido evento al documento en general y relacionandolo con los botones para no utilizar el stop propagation.
document.addEventListener ("click", (e) => {
    //console.log(e.target.matches(".card .btn-outline-primary"));

    if(e.target.matches(".card .btn-outline-primary")){
        console.log("agregar al carro.");
        agregarAlCarro(e);
    }

    //console.log(e.target.matches(".list-group-item .btn-success"));

    if(e.target.matches("#carro .list-group-item .btn-success")){
        btnAñadir(e);
    }

    //console.log(e.target.matches(".list-group-item .btn-danger"));

    if(e.target.matches("#carro .list-group-item .btn-danger")){
        btnQuitar(e);
    }
});

let carroObjeto = [];

/* Le pasamos "e" y en la constante producto le añadimos target.dataset.fruta que esta relacionado con el data-fruta
que le hemos pasado al button y que nos sirve de identificativo. */
const agregarAlCarro = (e) => {
    const producto = {
        titulo : e.target.dataset.fruta,
        id : e.target.dataset.fruta,
        cantidad : 1,
        precio: parseInt(e.target.dataset.precio) //utilizamos el parseInt para transformarlo a numero ya que lo utilizaremos para operar luego y la forma inicial en que lo devuelve es de tipo string.
    };

    //Usamos el indice para saber si habia inicialmente el elemento y para que lo empuje y vaya añadiendo uno a uno al evento del click del boton. Si no encuentra un id que esta relacionado con el indice, nos devuelve -1 que quiere decir que el producto no existe por lo cual, entra en el if y nos empuja el producto. Si encuentra el indice entra en el else modificando la cantidad.
    const indice = carroObjeto.findIndex((item) => item.id === producto.id);

    console.log(indice);

    if (indice === -1) {
        carroObjeto.push(producto);
    } else {
        carroObjeto[indice].cantidad ++;
        /* carroObjeto[indice].precio =  carroObjeto[indice].cantidad * producto.precio; */ 
    }

    console.log (carroObjeto);
    
    mostrarCarro();
};

const mostrarCarro = (array) => {

    carro.textContent = "";//Asi limpiamos el contenido y empieza "vacio" para que no salga con elemento inciales.

    carroObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;
        clone.querySelector('.btn-success').dataset.id = item.id;
        clone.querySelector('.btn-danger').dataset.id = item.id;

        fragment.appendChild(clone); //Con fragment limpiamos el reflow.
    });

    carro.appendChild(fragment);

    mostrarFooter();

};

const btnAñadir = (e) => {
    //console.log("me diste click", e.target.dataset.id);
    carroObjeto = carroObjeto.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++
        }
        return item
    })

    mostrarCarro();
};

const btnQuitar = (e) => {
    //console.log("me diste click", e.target.dataset.id);
    carroObjeto = carroObjeto.filter(item => {
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0) {
                item.cantidad --
                if (item.cantidad === 0) return
                    return item
            }
        } else { 
            return item }
    })

    mostrarCarro();
};


const mostrarFooter = () => {
    
    footer.textContent = "";

    const total = carroObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 
        0
    );

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('span').textContent = total

    footer.appendChild(clone);
};
