const sel = (elemento) => document.querySelector(elemento);
const selAll = (elemento) => document.querySelectorAll(elemento);


pizzaJson.map((item, index) => {    
    let pizzaItem = sel('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); //definindo index para as pizzas

    //MONTAGEM DO GRID COM AS PIZZAS
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //ABERTURA DE MODAL
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        
        e.preventDefault(); // bloqueando ação padrão da tag

        //pegando index da pizza clicada
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        //preenchendo modal com as informações da pizza
        sel('.pizzaBig img').src = pizzaJson[key].img;
        sel('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        sel('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;

      
        // colocando efeito para a abertura do modal
        sel('.pizzaWindowArea').style.opacity = 0;
        sel('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => { sel('.pizzaWindowArea').style.opacity = 1; });        
    });

    sel('.pizza-area').append(pizzaItem);
});