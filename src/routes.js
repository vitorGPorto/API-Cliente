const express = require('express')
const router = express.Router()

const ClienteController = require('./controllers/ClienteController')

// pegar todos clientes
router.get('/clientes', ClienteController.buscarTodos);

// caso queira passar alguma rota com paramento /:nome
//pegar somente um cliente
router.get('/cliente/:codigo', ClienteController.buscarUm);

//adcionar cliente
router.post('/cliente', ClienteController.inserir);

//alterar dados dos clientes
router.put('/cliente/:codigo', ClienteController.alterar);

//apaga dados dos clientes
router.delete('/cliente/:codigo', ClienteController.excluir);
module.exports = router