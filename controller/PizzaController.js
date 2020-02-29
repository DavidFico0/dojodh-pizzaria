const url = require('url');
const pizzaModel = require("../model/Pizzas");

const pizzaController = {
    
    index:(req, res) => {
        res.send(pizzaModel.listarPizzas())
    },

    formPedido:(req, res) => {
        res.send(pizzaModel.formPedido())
    },

    pedidos:(req, res) =>{
        let urlCompleta = url.parse(req.url, true);
        let queryString = urlCompleta.query; // parametros
        console.log(queryString);
        res.send(pizzaModel.pedidos(queryString));
    },

    listarComandas:(req, res) => {
        res.send(pizzaModel.listarComandas());
    },

    pedido:(req, res) => {
        res.send(pizzaModel.pedido(req.params.nome));
    },

    pizzasPedido:(req, res) => {
        let urlCompleta = url.parse(req.url, true);
        let queryString = urlCompleta.query; // parametros
        let json = JSON.parse(JSON.stringify(queryString));
        let obj = Object.values(json);
        console.log(obj);
        res.send(pizzaModel.pizzasPedido(queryString));
    },

    fecharPedido:(req, res) => {
        res.send(pizzaModel.fecharPedido(req.params.nome))
    }
}

module.exports = pizzaController