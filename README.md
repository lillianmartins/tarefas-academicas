# Tarefas Acadêmicas — Node.js + Express + MVC

Aplicação web para organizar tarefas acadêmicas: cadastrar, listar, consultar detalhes, editar, concluir, excluir (com confirmação) e filtrar por status (pendente e concluída). 
Os dados ficam em memória (array de objetos), então somem quando o servidor é reiniciado.

## Como rodar

```bash
npm install
npm start
```

Acesse http://localhost:3000

## Estrutura (MVC)

```
src/
├── app.js                       configura o Express e sobe o servidor
├── routes/tarefaRoutes.js       liga cada URL a um método do controller
├── controllers/tarefaController.js   recebe a requisição, chama o Model e escolhe a View
├── models/tarefaModel.js        array em memória, geração de id e validações
├── views/index.ejs              template EJS único; 
└── public/css/style.css         estilização da página
```

## Rotas

| Ação | Método e rota |
|---|---|
| Listar / filtrar | `GET /tarefas?status=todas\|pendente\|concluida` |
| Formulário de cadastro | `GET /tarefas/nova` |
| Cadastrar | `POST /tarefas` |
| Detalhes | `GET /tarefas/:id` |
| Formulário de edição | `GET /tarefas/:id/editar` |
| Editar | `POST /tarefas/:id/editar` |
| Concluir | `POST /tarefas/:id/concluir` |
| Confirmar exclusão | `GET /tarefas/:id/excluir` |
| Excluir | `POST /tarefas/:id/excluir` |

## Regras de validação (no Model)

- `titulo`: obrigatório, de 3 a 100 caracteres
- `descricao`: opcional, até 500 caracteres
- `disciplina`: obrigatória, de 2 a 80 caracteres
- `status`: `pendente` ao criar; só muda para `concluida` pela ação de concluir
- `id`: gerado pela aplicação por um contador que só aumenta (não repete após exclusões)
