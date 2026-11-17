const STATUS = { 
    PENDENTE: 'pendente', 
    CONCLUIDA: 'concluida' 
};

let tarefas = [];
let proximoId = 1; 

function normalizar(dados = {}) {
  return {
    titulo: String(dados.titulo ?? '').trim(),
    descricao: String(dados.descricao ?? '').trim(),
    disciplina: String(dados.disciplina ?? '').trim(),
  };
}

function validar({ titulo, descricao, disciplina }) {
  const erros = [];
  if (titulo.length < 3 || titulo.length > 100) {
    erros.push('O título é obrigatório e deve ter entre 3 e 100 caracteres.');
  }
  if (descricao.length > 500) {
    erros.push('A descrição pode ter no máximo 500 caracteres.');
  }
  if (disciplina.length < 2 || disciplina.length > 80) {
    erros.push('A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.');
  }
  return erros;
}

function listar(filtro = 'todas') {
  const lista = filtro === 'todas' ? tarefas : tarefas.filter((tarefa) => tarefa.status === filtro);
  return lista.map((tarefa) => ({ ...tarefa }));
}

function criar(dadosBrutos) {
  const dados = normalizar(dadosBrutos);
  const erros = validar(dados);
  if (erros.length > 0) return { erros, dados };

  const tarefa = { id: proximoId++, ...dados, status: STATUS.PENDENTE };
  tarefas.push(tarefa);
  return { tarefa: { ...tarefa } };
}

function buscar(id) {
  return tarefas.find((tarefa) => tarefa.id === id);
}

function buscarPorId(id) {
  const tarefa = buscar(id);
  return tarefa ? { ...tarefa } : null;
}

function editar(id, dadosBrutos) {
  const tarefa = buscar(id);
  if (!tarefa) return null;

  const dados = normalizar(dadosBrutos);
  const erros = validar(dados);
  if (erros.length > 0) return { erros, dados };

  Object.assign(tarefa, dados);
  return { tarefa: { ...tarefa } };
}

function excluir(id) {
  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);
  if (indice === -1) return false;
  tarefas.splice(indice, 1);
  return true;
}

function concluir(id) {
  const tarefa = buscar(id);
  if (!tarefa) return null;
  tarefa.status = STATUS.CONCLUIDA;
  return { ...tarefa };
}

function contarStatus() {
  return {
    todas: tarefas.length,
    pendente: tarefas.filter((tarefa) => tarefa.status === STATUS.PENDENTE).length,
    concluida: tarefas.filter((tarefa) => tarefa.status === STATUS.CONCLUIDA).length,
  };
}

module.exports = { STATUS, listar, contarStatus, buscarPorId, criar, editar, concluir, excluir };
