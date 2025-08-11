📌 Projeto de Autenticação com JWT
📖 Descrição
Este projeto é um backend simples focado em autenticação de usuários utilizando JWT (JSON Web Token).
Ele permite que um usuário faça login com e-mail e senha, receba um token de autenticação e utilize esse token para acessar rotas protegidas.

🚀 Tecnologias Utilizadas
Node.js – Ambiente de execução

TypeScript – Tipagem estática

Express – Framework para APIs

Mongoose – ODM para MongoDB

bcryptjs – Criptografia de senhas

jsonwebtoken – Geração e validação de tokens

dotenv – Configuração de variáveis de ambiente
(Opcional)

Joi ou Zod – Validação de dados de entrada

## 📂 Estrutura de Pastas

```
src/
├── controllers/
│   └── auth.controller.ts      # Recebe a requisição e chama o service
├── services/
│   └── auth.services.ts         # Lógica de autenticação e geração de token
├── models/
│   └── user.models.ts           # Schema do usuário no MongoDB
├── interfaces/
│   └── user.interfaces.ts       # Tipos e interfaces TypeScript
├── middlewares/
│   └── auth.middleware.ts       # (Opcional) Validação do JWT nas rotas protegidas
├── routes/
│   └── auth.routes.ts           # Rotas de login
└── app.ts                       # Inicialização do servidor
```


🔑 Fluxo de Autenticação
Usuário envia e-mail e senha para /login.

AuthService busca o usuário no banco de dados.

Senha é comparada com o hash usando bcryptjs.

Se válida, gera um token JWT com tempo de expiração.

O token é retornado junto com os dados públicos do usuário (sem senha).

Rotas protegidas verificam o token no header Authorization.

📜 Exemplo de Requisição de Login
http

POST /login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "123456"
}
Resposta

json
Copiar
Editar
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
  "user": {
    "id": "64d9b1f2f3...",
    "name": "Usuário Teste",
    "email": "usuario@email.com",
    "createdAt": "2025-08-11T12:00:00.000Z",
    "updatedAt": "2025-08-11T12:00:00.000Z"
  }
}
🔒 Protegendo Rotas
Adicionar middleware para validar o token:

ts

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não informado" });

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET!;
    jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
✅ Próximos Passos
Adicionar validação de entrada com Joi ou Zod para garantir que e-mail e senha sejam válidos antes de processar o login.

Criar sistema de cadastro de usuários com hash de senha.

Implementar refresh tokens para sessões mais longas.

Configurar testes automatizados para validar a autenticação.