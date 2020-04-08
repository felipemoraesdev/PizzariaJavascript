const sel = (elemento) => document.querySelector(elemento);
const selAll = (elemento) => document.querySelectorAll(elemento);

let modalQt = 1;
let cart = [];
let modalKey = 0;

pizzaJson.map((item, index) => {    
    let pizzaItem = sel('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); //definindo index para as pizzas

    //MONTAGEM DO GRID COM AS PIZZAS
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //LISTAGEM DAS PIZZAS
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        
        e.preventDefault(); // bloqueando ação padrão da tag

        modalQt = 1 // setando o valor 1 novamente ao abrir

        //pegando index da pizza clicada
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        //preenchendo modal com as informações da pizza
        sel('.pizzaBig img').src = pizzaJson[key].img;
        sel('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        sel('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        sel('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        sel('.pizzaInfo--size.selected').classList.remove('selected');
        
        selAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 1) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });


        //colocando a quantidade de pizzas
        sel('.pizzaInfo--qt').innerHTML = modalQt;
      
        // colocando efeito para a abertura do modal
        sel('.pizzaWindowArea').style.opacity = 0;
        sel('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => { sel('.pizzaWindowArea').style.opacity = 1; });        
    });

    sel('.pizza-area').append(pizzaItem);
});


// ***** EVENTOS DO MODAL *****
//FECHANDO A JANELA
function closeModal(){
    sel('.pizzaWindowArea').style.opacity = 0;
    setTimeout( () => {
        sel('.pizzaWindowArea').style.display = 'none';    
    }, 500);
};

selAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//MANIPULANDO AS QUANTIDADES DE SELEÇÃO
sel('.pizzaInfo--qtmenos').addEventListener('click', () => {
    //verificando se quantidade de pizzas é maior que 1 para fazer redução
    if(modalQt > 1) {
        modalQt--; 
        sel('.pizzaInfo--qt').innerHTML = modalQt; //colocando a quantidade de pizzas      
    }
    
});
sel('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    sel('.pizzaInfo--qt').innerHTML = modalQt; //colocando a quantidade de pizzas      
});

//SELECIONANDO AS OPÇÕES DA PIZZA
selAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        sel('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//ADICIONANDO AO CARRINHO DE COMPRAS
sel('.pizzaInfo--addButton').addEventListener('click',  () => {
    let size = parseInt(sel('.pizzaInfo--size.selected').getAttribute('data-key'));

    //criando identificador de sabor e tamanho
    let identfier = pizzaJson[ modalKey ].id + '@' + size;

    //verificando se ja existe pizza com mesmo identificador no array
    let key = cart.findIndex((item) => item.identfier == identfier);
    if (key > -1) {
        //aumentando a quantidade do item encontrado
        cart[key].qt += modalQt;
    } else {
        //adicionando novo item
        cart.push({
            id : pizzaJson[ modalKey ].id,
            size,
            qt : modalQt
        });
    }    

    closeModal();
    updateCart();
    
});

// ***** AÇÕES DO CARRINHO DE COMPRAS *****
//funcão de atualização
function updateCart(){
    if (cart.length > 0) {
        sel('aside').classList.add('show'); //adiciona class que exibe o carrinho

        //buscando informações da pizza
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);                             
        }
    } else {
        sel('aside').classList.remove('show');
    }
}