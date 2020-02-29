let pizzas =[
    {
        nome: "Calabresa",
        categoria: "Salgada",
        preco: 10
    },
    {
        nome: "Mussarela",
        categoria: "Salgada",
        preco: 12
    },
    {
        nome: "Chocolate",
        categoria: "Doce",
        preco: 15
    },
    {
        nome: "Brócolis",
        categoria: "Vegetariana",
        preco: 30
    },
    {
        nome: "Portuguesa",
        categoria: "Salgada",
        preco: 30
    }
];
let comanda = [];
const listarPizzas = () =>{
    let conteudo = "<h1>** Pizzaria DH **</h1><p><a href='/formPedido'>Realizar Pedido</a> | <a href='/listarComandas'>Comandas</a></p>"
    conteudo += "<div>";
    for(let pizza of pizzas){
        conteudo +=`<div style='width:200px; position:relative; float: left; border-style: solid;'><ul><li>Sabor: ${pizza.nome}</li><li>Categoria: ${pizza.categoria} </li><li>Preço: ${pizza.preco}</li></ul></div>`;   
    }
    conteudo += "</div>"
    return conteudo;
}

const formPedido = () => {
    let conteudo = "<h1>** Pizzaria DH **</h1><h2>::Pedido::....</h2><a href='/pedidos'>Home</a> | <a href='/listarComandas'>Comandas</a> <p>Insira o cliente e mesa:<form method='GET' action='/pedidos'><input type='text' name='nome' placeholder='Nome cliente...' /><br/> <input type='text' name='numero' placeholder='Nº Comanda...' /><br/><input type='text' name='telefone' placeholder='Fone...' /><br/><br/><input type='radio' name='consumo' value='Entregar'/>Para viagem?<input type='radio' name='consumo' value='Comer no local'/>Comer no local? <input type='submit' value='Inserir' /></form></p>";
    return conteudo;
}

const listarComandas = () =>{
    let conteudo = "<h1>** Pizzaria DH **</h1><h2>::Comandas::....</h2><p><a href='/'>Home</a> | <a href='/formPedido'>Nova comanda</a></p>"
    conteudo += "<div>";
    for(let c of comanda){
        conteudo +=`<div style='width:200px; position:relative; float: left; border-style: solid;'><ul><li>Nome: <a href='/pedido/${c.nome}'>${c.nome}</a></li><li>Nº C: ${c.numero} </li><li>Fone: ${c.telefone}</li><li>Forma: ${c.consumo}</li></ul></div>`;   
    }
    conteudo += "</div>"
    return conteudo;
}


const pedidos = (novaCom) =>{
    let conteudo = "<h1>** Pizzaria DH **</h1><h2>::Comandas::....</h2><p><a href='/'>Home</a> | <a href='/formPedido'>Nova comanda</a></p>"
    //console.log(novaCom);
    comanda.push(novaCom);
    conteudo += "<div>";
    for(let c of comanda){
        conteudo +=`<div style='width:200px; position:relative; float: left; border-style: solid;'><ul><li>Nome: <a href='/pedido/${c.nome}'>${c.nome}</a></li><li>Nº C: ${c.numero} </li><li>Fone: ${c.telefone}</li><li>Forma: ${c.consumo}</li></ul></div>`;   
    }
    conteudo += "</div>"
    return conteudo;
}

const pedido = (nome) => {
    let conteudo = `<h1>** Pizzaria DH **</h1><h2>::Comanda::....</h2><p><a href='/'>Home</a> | <a href='/listarComandas'>Comandas</a> | <a href='/formPedido'>Nova comanda</a> | <a href='/fecharPedido/${nome}'>Fechar Pedido</a></p>`
    let c = comanda.filter(com => com.nome == nome);
    console.log(c);
    if(c[0].pizzas){
        conteudo += `<div style='width:250px; border-style: solid;'><ul><li>Nome: ${c[0].nome}</li><li>Nº C: ${c[0].numero} </li><li>Fone: ${c[0].telefone}</li><li>Forma: ${c[0].consumo}</li></ul><table><tr><th>Sabor</th><th>Categoria</th><th>Preço</th></tr>`;
        for(let p of c[0].pizzas){
            conteudo +=`<tr><td>${p.nome}</td><td>${p.categoria}</td><td>${p.preco}</td>`;   
        }
        conteudo += "</table></div>"
    }
    else{
        conteudo += `<div style='width:200px; border-style: solid;'><ul><li>Nome: ${c[0].nome}</li><li>Nº C: ${c[0].numero} </li><li>Fone: ${c[0].telefone}</li><li>Forma: ${c[0].consumo}</li></ul></div>`;

    }
    conteudo += `<h2>-- Escolha as pizzas --</h2><form action='/pizzasPedido' method='GET'><div><input name='nome' value='${c[0].nome}' type='hidden'/>`;
    for(let pizza of pizzas){
        conteudo +=`<div style='width:200px; position:relative; float: left; border-style: solid;'><ul><li>Sabor: ${pizza.nome} <input type='checkbox' name='pizzas' value='{"nome":"${pizza.nome}", "categoria":"${pizza.categoria}", "preco":${pizza.preco} }'/></li><li>Categoria: ${pizza.categoria} </li><li>Preço: ${pizza.preco}</li></ul></div>`;   
    }
    conteudo += "</div><div><input value='Inserir' type='submit'/></div></form>"
    return conteudo;
}

const pizzasPedido = (objeto) => {
    //let nome = pizzas[0].toString();
    let nome = objeto.nome;
    let c = comanda.filter(com => com.nome == nome);
    let arrayPizzas = [];
    //console.log(pizzas[1].length);
    if(Array.isArray(objeto.pizzas)){
        for(let a of objeto.pizzas){
            let pizzaStr = a;
            let pizzaObj = JSON.parse(pizzaStr);
            arrayPizzas.push(pizzaObj);
            //console.log(pizzaStr);
        }
    } else{
        let pizzaStr = objeto.pizzas;
        let pizzaObj = JSON.parse(pizzaStr);
        arrayPizzas.push(pizzaObj);
    }
    console.log(arrayPizzas.length);
    if(c[0].pizzas){
        for(let p of arrayPizzas){
            c[0].pizzas.push(p);
        }
    }
    else {
        c[0].pizzas = arrayPizzas; 
    }

    let valorComanda = 0;
    for(let f of c[0].pizzas){
        valorComanda += f.preco;
    }
    
    let conteudo = `<h1>** Pizzaria DH **</h1><h2>::Comanda::....</h2><p><a href='/'>Home</a> | <a href='/pedido/${c[0].nome}'>Inserir</a> | <a href='/listarComandas'>Comandas</a> | <a href='/formPedido'>Nova comanda</a>| <a href='/fecharPedido/${c[0].nome}'>Fechar Pedido</a></p>`;
    conteudo += `<div style='width:250px; border-style: solid;'><ul><li>Nome: ${c[0].nome}</li><li>Nº C: ${c[0].numero} </li><li>Fone: ${c[0].telefone}</li><li>Forma: ${c[0].consumo}</li></ul><table><tr><th>Sabor</th><th>Categoria</th><th>Preço</th></tr>`;
    for(let p of c[0].pizzas){
        conteudo +=`<tr><td>${p.nome}</td><td>${p.categoria}</td><td>R$ ${p.preco}</td>`;   
    }
    conteudo += `<tr><td></td><td>Total</td><td>R$ ${valorComanda}</td></tr></table></div>`
    return conteudo;
};

const fecharPedido = (nome) => {
    let c = comanda.filter(com => com.nome == nome);
    let valorComanda = 0;
    for(let f of c[0].pizzas){
        valorComanda += f.preco;
    }
    let conteudo = `<h1>** Pizzaria DH **</h1><h2>...::Comanda Fechada::....</h2><p><a href='/'>Home</a> | <a href='/listarComandas'>Comandas</a> | <a href='/formPedido'>Nova comanda</a></p>`;
    conteudo += `<div style='width:250px; border-style: solid;'><ul><li>Nome: ${c[0].nome}</li><li>Nº C: ${c[0].numero} </li><li>Fone: ${c[0].telefone}</li><li>Forma: ${c[0].consumo}</li></ul><table><tr><th>Sabor</th><th>Categoria</th><th>Preço</th></tr>`;
    for(let p of c[0].pizzas){
        conteudo +=`<tr><td>${p.nome}</td><td>${p.categoria}</td><td>R$ ${p.preco}</td>`;   
    }
    conteudo += `<hr/>`;
    conteudo += `<tr><td></td><td>Total Pagar:</td><td>R$ ${valorComanda}</td></tr></table></div>`;
    return conteudo;

}

module.exports = {listarPizzas, formPedido, listarComandas, pedidos, pedido, pizzasPedido, fecharPedido}