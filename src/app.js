const express = require('express');
const path = require('path');
const tarefaRoutes = require('./routes/TarefaRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/tarefas'));
app.use('/tarefas', tarefaRoutes);

app.use((req, res) => {
  res.status(404).render('index', {
    titulo: 'Não encontrado',
    pagina: 'nao-encontrado',
    mensagem: 'Página não encontrada.',
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
