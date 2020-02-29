const express = require('express')
const app = express()
const pizzaRota = require('./routes/routePizza')

app.listen(3000, () => console.log("Servidor online!"));

app.use(pizzaRota);