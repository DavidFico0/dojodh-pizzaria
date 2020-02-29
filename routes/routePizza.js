const express = require('express');
const Router = express.Router();
const pizzaController = require("../controller/PizzaController");

Router.get('/', pizzaController.index);

Router.get('/formPedido', pizzaController.formPedido)

Router.get('/pedidos', pizzaController.pedidos)

Router.get('/listarComandas', pizzaController.listarComandas)

Router.get('/pedido/:nome', pizzaController.pedido)

Router.get('/pizzasPedido', pizzaController.pizzasPedido)

Router.get('/fecharPedido/:nome', pizzaController.fecharPedido)

module.exports = Router;