const Tarefa = require('../model/TarefaModel');
const FILTROS_VALIDOS = ['todas', 'pendente', 'concluida'];

function lerId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) ? id : null;
}

function naoEncontrada(res) {
  return res.status(404).render('index', {
    titulo: 'Não encontrado',
    pagina: 'nao-encontrado',
    mensagem: 'Tarefa não encontrada.',
  });
}

function listar(req, res) {
  const filtro = FILTROS_VALIDOS.includes(req.query.status) ? req.query.status : 'todas';
  res.render('index', {
    titulo: 'Tarefas',
    pagina: 'lista',
    tarefas: Tarefa.listar(filtro),
    contagem: Tarefa.contarStatus(),
    filtro,
  });
}

function formNova(req, res) {
  res.render('index', {
    titulo: 'Nova tarefa',
    tituloPagina: 'Nova tarefa',
    pagina: 'formulario',
    acao: '/tarefas',
    botao: 'Cadastrar tarefa',
    cancelar: '/tarefas',
    erros: [],
    dados: { titulo: '', descricao: '', disciplina: '' },
  });
}

function criar(req, res) {
  const resultado = Tarefa.criar(req.body);

  if (resultado.erros) {
    return res.status(400).render('index', {
      titulo: 'Nova tarefa',
      tituloPagina: 'Nova tarefa',
      pagina: 'formulario',
      acao: '/tarefas',
      botao: 'Cadastrar tarefa',
      cancelar: '/tarefas',
      erros: resultado.erros,
      dados: resultado.dados,
    });
  }

  res.redirect('/tarefas');
}

function detalhes(req, res) {
  const tarefa = Tarefa.buscarPorId(lerId(req));

  if (!tarefa) return naoEncontrada(res);

  res.render('index', { titulo: tarefa.titulo, pagina: 'detalhes', tarefa });
}

function formEditar(req, res) {
  const tarefa = Tarefa.buscarPorId(lerId(req));

  if (!tarefa) return naoEncontrada(res);

  res.render('index', {
    titulo: 'Editar tarefa',
    tituloPagina: 'Editar tarefa',
    pagina: 'formulario',
    acao: `/tarefas/${tarefa.id}/editar`,
    botao: 'Salvar alterações',
    cancelar: `/tarefas/${tarefa.id}`,
    erros: [],
    dados: tarefa,
  });
}

function atualizar(req, res) {
  const id = lerId(req);
  const resultado = Tarefa.editar(id, req.body);

  if (!resultado) return naoEncontrada(res);

  if (resultado.erros) {
    return res.status(400).render('index', {
      titulo: 'Editar tarefa',
      tituloPagina: 'Editar tarefa',
      pagina: 'formulario',
      acao: `/tarefas/${id}/editar`,
      cancelar: `/tarefas/${id}`,
      botao: 'Salvar alterações',
      erros: resultado.erros,
      dados: resultado.dados,
    });
  }

  res.redirect(`/tarefas/${id}`);
}

function concluir(req, res) {
  const tarefa = Tarefa.concluir(lerId(req));

  if (!tarefa) return naoEncontrada(res);

  res.redirect(req.get('Referer') || '/tarefas');
}

function confirmarExclusao(req, res) {
  const tarefa = Tarefa.buscarPorId(lerId(req));

  if (!tarefa) return naoEncontrada(res);

  res.render('index', {
    titulo: 'Excluir tarefa',
    pagina: 'confirmar-exclusao',
    tarefa,
  });
}

function excluir(req, res) {
  if (!Tarefa.excluir(lerId(req))) return naoEncontrada(res);

  res.redirect('/tarefas');
}

module.exports = {
  listar, formNova, criar, detalhes, formEditar, atualizar, concluir, confirmarExclusao, excluir,
};