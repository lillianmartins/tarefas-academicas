const express = require('express');
const controller = require('../controller/TarefaController');

const router = express.Router();

router.get('/', controller.listar);
router.get('/nova', controller.formNova);
router.post('/', controller.criar);
router.get('/:id', controller.detalhes);
router.get('/:id/editar', controller.formEditar);
router.post('/:id/editar', controller.atualizar);
router.post('/:id/concluir', controller.concluir);
router.get('/:id/excluir', controller.confirmarExclusao);
router.post('/:id/excluir', controller.excluir);

module.exports = router;
