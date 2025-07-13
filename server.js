const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração para processar dados de formulário (necessário para o contato.html)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para futuras APIs, se necessário

// --- Rotas da Aplicação ---

// Rota para a página inicial (Cardápio)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para a página de Contato/Sugestões
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota para receber sugestões do formulário
app.post('/sugestao', (req, res) => {
    const { nome, sugestao } = req.body;
    console.log(`Nova Sugestão de ${nome}: ${sugestao}`);
    // Aqui você pode adicionar lógica para salvar a sugestão, etc.
    res.send(`<h1>Obrigado, ${nome}!</h1><p>Sua sugestão foi recebida: "${sugestao}".</p><p><a href="/">Voltar ao cardápio</a></p>`);
});

// Rota para simular uma API que retorna o cardápio (lanches.json)
app.get('/api/cardapio', (req, res) => {
    const lanches = require('./public/data/lanches.json');
    res.json(lanches);
});

// Rota para 404 
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor DevBurger rodando em http://localhost:${port}`);
    console.log(`Cardápio: http://localhost:${port}/`);
    console.log(`Contato: http://localhost:${port}/contato`);
    console.log(`API Cardápio: http://localhost:${port}/api/cardapio`);
});