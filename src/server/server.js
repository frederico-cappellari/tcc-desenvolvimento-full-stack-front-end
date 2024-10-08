const http = require('http');
const fs = require('fs');
const url = require('url');

// Função para ler o arquivo exemplo.json
const readDatabase = () => {
  const data = fs.readFileSync('./src/server/exemplo.json');
  return JSON.parse(data);
};

// Função para escrever no arquivo exemplo.json
const writeDatabase = (data) => {
  fs.writeFileSync('./src/server/exemplo.json', JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;
  const id = parseInt(pathname.split('/')[2], 10); // Pega o ID da URL

  // Configuração para permitir requisições de diferentes origens (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS
  if (method === 'OPTIONS') {
    res.writeHead(204); // Sem conteúdo
    res.end();
    return;
  }

  // Leitura do banco de dados
  let { alunos, cursos } = readDatabase();

  // GET - Listar todos os alunos ou buscar um aluno específico
  if (pathname === '/alunos' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(alunos));
  } else if (pathname.startsWith('/alunos/') && method === 'GET') {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(aluno));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }

    // POST - Adicionar um novo aluno
  } else if (pathname === '/alunos' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const newAluno = JSON.parse(body);
      newAluno.id = alunos.length ? alunos[alunos.length - 1].id + 1 : 1;
      alunos.push(newAluno);
      writeDatabase({ alunos, cursos });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newAluno));
    });

    // PUT - Atualizar um aluno por ID na URL
  } else if (pathname.startsWith('/alunos/') && method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const updatedAluno = JSON.parse(body);
      const alunoIndex = alunos.findIndex(s => s.id === id); // Busca pelo ID da URL
      if (alunoIndex !== -1) {
        alunos[alunoIndex] = { ...alunos[alunoIndex], ...updatedAluno, id }; // Atualiza preservando o ID
        writeDatabase({ alunos, cursos });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(alunos[alunoIndex]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
      }
    });

    // DELETE - Remover um aluno por ID na URL
  } else if (pathname.startsWith('/alunos/') && method === 'DELETE') {
    const alunoIndex = alunos.findIndex(a => a.id === id);
    if (alunoIndex !== -1) {
      alunos.splice(alunoIndex, 1);
      writeDatabase({ alunos, cursos });
      res.writeHead(204); // No content
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }

    // GET - Listar todos os cursos
  } else if (pathname === '/cursos' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cursos));

  } else {
    // Rota não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`O servidor está sendo executado na porta ${PORT}`);
});
