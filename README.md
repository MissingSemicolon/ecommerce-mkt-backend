# 🛒 E-commerce MKT Backend

Este projeto é uma API RESTful para um sistema de e-commerce, desenvolvida em Node.js com TypeScript, MongoDB e Express. Ela oferece endpoints para gerenciamento de usuários, produtos, categorias e wishlists, além de autenticação JWT e documentação Swagger.

---

## ✨ Principais Funcionalidades

- 👤 *Cadastro e autenticação de usuários* (JWT)
- 📦 *Gerenciamento de produtos* (CRUD)
- 🏷 *Gerenciamento de categorias* (CRUD)
- 💖 *Wishlist*: associação de produtos a uma lista de desejos por usuário
- ✅ *Validação de dados* com express-validator
- 🔒 *Criptografia de Repouso* com bcrypt
- 📄 *Documentação* com Swagger

---

## 🛠 Tecnologias Utilizadas

- ⚡ *Node.js* & *TypeScript*
- 🚀 *Express*
- 🍃 *MongoDB* (Mongoose)
- 🔑 *JWT* para autenticação
- 🔒 *bcrypt* para criptografia de senhas
- 🛡 *express-validator* para validação de dados
- 📚 *Swagger* para documentação da API
- 🧪 *Jest* para testes automatizados

---

## 📁 Estrutura de Pastas


src/
  auth/
  config/
  controllers/
  dtos/
  models/
  repositories/
  routes/
  seeders/
  services/
  tests/
  app.ts
  server.ts
  swagger.ts


---

## 🔗 Endpoints Principais

### 👤 Usuário / Conta

- POST /account/register  
  Cadastro de novo usuário

- POST /account/register/admin  
  Cadastro de novo administrador (exige autenticação JWT)  

- POST /account/login  
  Login de usuário e obtenção de token JWT

---

### 📦 Produtos

- GET /products/list  
  Lista todos os produtos

- GET /products/:id 
  Busca produto pelo ID

- POST /products/register
  Cria novo produto (requer autenticação e perfil admin)

- PUT /products/:id
  Atualiza produto (requer autenticação e perfil admin)

- DELETE /products/:id
  Remove produto (requer autenticação e perfil admin)

---

### 🏷 Categorias

- GET /categories/list
  Lista todas as categorias

- POST /categories/register  
  Cria nova categoria (requer autenticação e perfil admin)

- DELETE /categories/:id  
  Remove categoria (requer autenticação e perfil admin)

---

### 💖 Wishlist

- GET /wishlist (exige autenticação JWT)  
  Busca wishlist do usuário autenticado

- POST /wishlist/add  (exige autenticação JWT)   
  Adiciona produto à wishlist do usuário autenticado

- POST /wishlist/remove (exige autenticação JWT)   
  Remove produto da wishlist do usuário autenticado

---

### 📝 Pré-requisitos

- NodeJS
- Database MongoDB

---

## ▶ Como rodar o projeto

1. *Clone o repositório*  
   
   git clone https://github.com/MissingSemicolon/ecommerce-mkt-backend
   
2. *Instale as dependências*
   
   npm install
   
3. *Configure as variáveis de ambiente*  
   Crie um arquivo .env com as variáveis necessárias (ex: MONGO_URI, JWT_SECRET).
   <br>
4. *Rode os seeders para facilitar testes e acessos*  
   
   npm run seed
   
5. *Inicie o servidor*
   
   npm run dev
   
6. *Acesse a documentação Swagger*  
   [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🧪 Testes

Execute os testes automatizados com:

npm test


---

## ⚠ Observações

- O projeto utiliza autenticação JWT para rotas protegidas.
- Apenas usuários com perfil admin podem cadastrar, atualizar, remover produtos e categorias e cadastrar novos administradores.
- A wishlist é criada automaticamente ao adicionar o primeiro produto e removida quando fica vazia.

---

## 📚 Documentação

A documentação completa dos endpoints está disponível via Swagger em /api-docs após iniciar o servidor.

---