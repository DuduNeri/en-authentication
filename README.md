# 🔐 API de Autenticação com JWT

## 📖 Descrição
Este projeto é uma API simples de autenticação utilizando **JWT (JSON Web Token)** para proteger rotas e controlar o acesso de usuários.  
Ele permite que um usuário faça login com e-mail e senha, gere um token de acesso e utilize esse token para acessar endpoints protegidos.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** – Ambiente de execução
- **TypeScript** – Tipagem estática
- **Express** – Framework para APIs
- **Mongoose** – ODM para MongoDB
- **bcryptjs** – Criptografia de senhas
- **jsonwebtoken** – Geração e validação de tokens
- **dotenv** – Configuração de variáveis de ambiente
- *(Opcional)* **Joi** ou **Zod** – Validação de dados de entrada

---

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

---

## 🔑 Fluxo de Autenticação
1. **Usuário envia** e-mail e senha para a rota `/login`.
2. **AuthService** busca o usuário no banco de dados.
3. **Senha é comparada** com o hash usando `bcryptjs`.
4. **Se válida**, gera um **token JWT** com tempo de expiração.
5. O token é retornado junto com os dados públicos do usuário (sem senha).
6. Rotas protegidas verificam o token no header `Authorization`.

---

## 📜 Exemplo de Requisição de Login

**Requisição**
```http
POST /login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Resposta**
```json
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
```

---

## 🔒 Protegendo Rotas

Exemplo de middleware para validar token:

```ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
 
