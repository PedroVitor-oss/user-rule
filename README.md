# User Rules
![img](https://raw.githubusercontent.com/PedroVitor-oss/user-rule/refs/heads/main/public/img/banner.jpg)<br>
Um projeto de estudo desenvolvido para compreender os fundamentos de autenticação e autorização em APIs REST utilizando **Node.js, Express e JWT**.

O UserRules tem como objetivo simplificar a lógica de login e proteção de rotas, demonstrando como um servidor identifica usuários, valida tokens e controla o acesso a recursos com base em permissões.

## 🎯 Objetivo

Estudar os mecanismos fundamentais de autenticação e autorização utilizados em aplicações backend, sem adicionar complexidades como banco de dados, ORM ou frontend.

O projeto utiliza usuários armazenados em memória para demonstrar o fluxo completo de autenticação.

## 🛠️ Tecnologias utilizadas

* **Node.js:** ambiente de execução JavaScript no backend.
* **Express:** criação do servidor HTTP e gerenciamento de rotas.
* **jsonwebtoken:** geração e validação de tokens JWT.

## 📚 Conceitos estudados

### 1. Autenticação

Processo responsável por verificar a identidade do usuário por meio de suas credenciais.

No UserRules, o usuário informa e-mail e senha. O servidor verifica essas informações e, caso sejam válidas, gera um token JWT.

### 2. JWT — JSON Web Token

Token utilizado para representar informações sobre o usuário autenticado.

O projeto utiliza o JWT para transportar informações como o identificador do usuário e seu perfil, além de definir um prazo de expiração.

### 3. Middlewares

Funções executadas durante o processamento de uma requisição, antes de ela chegar à rota final.

O projeto utiliza middlewares para:

* Verificar se o token foi enviado.
* Validar a assinatura e a expiração do JWT.
* Disponibilizar os dados do usuário autenticado na requisição.
* Bloquear o acesso de usuários sem permissão.

### 4. Autorização por perfil

Diferencia a identidade do usuário das permissões que ele possui.

O UserRules trabalha com dois perfis:

* **ADMIN:** pode acessar rotas comuns e administrativas.
* **USER:** pode acessar rotas autenticadas comuns, mas não as administrativas.

### 5. Códigos de resposta HTTP

O projeto também demonstra o uso de códigos HTTP para representar diferentes situações:

* `200 OK`: requisição processada com sucesso.
* `401 Unauthorized`: autenticação ausente ou inválida.
* `403 Forbidden`: usuário autenticado sem permissão para acessar o recurso.

## 🚦 Rotas da API

| Método | Rota       | Acesso        | Descrição                                  |
| ------ | ---------- | ------------- | ------------------------------------------ |
| POST   | `/login`   | Público       | Valida credenciais e retorna um JWT        |
| GET    | `/publico` | Público       | Demonstra uma rota sem autenticação        |
| GET    | `/perfil`  | Autenticado   | Retorna informações do usuário autenticado |
| GET    | `/admin`   | Somente ADMIN | Demonstra a proteção por perfil            |

## 📂 Estrutura do projeto

```text
UserRules/
├── src/
│   ├── server.js
│   ├── usuarios.js
│   └── middleware/
│       ├── autenticar.js
│       └── soAdmin.js
├── package.json
└── README.md
```

**Responsabilidade dos arquivos:**

* `server.js`: configura o servidor, declara as rotas e implementa o login.
* `usuarios.js`: contém os usuários fictícios utilizados nos testes.
* `middleware/autenticar.js`: valida o JWT e identifica o usuário da requisição.
* `middleware/soAdmin.js`: verifica se o usuário possui o perfil de administrador.

## ⚙️ Como executar

### Pré-requisitos

* Node.js instalado.
* npm instalado.

### Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd UserRules
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
node src/server.js
```

Por padrão, a aplicação estará disponível em:

```text
http://localhost:3000
```

## 🧪 Usuários para teste

O projeto utiliza dois usuários fictícios armazenados em memória.

| Perfil | E-mail              | Senha      |
| ------ | ------------------- | ---------- |
| ADMIN  | `admin@example.com` | `12345678` |
| USER   | `user@example.com`  | `12345678` |

Essas credenciais são exclusivamente para fins didáticos.

## 🔍 Fluxo de autenticação

O fluxo principal pode ser representado pelas seguintes etapas:

1. O cliente envia e-mail e senha para `/login`.
2. O servidor verifica as credenciais.
3. Se forem válidas, o servidor gera um JWT.
4. O cliente envia o token no cabeçalho `Authorization` das próximas requisições protegidas.
5. O middleware `autenticar` verifica o token e disponibiliza os dados do usuário em `req.usuario`.
6. Quando necessário, o middleware `soAdmin` verifica o perfil.
7. A requisição é liberada ou bloqueada de acordo com as regras de acesso.

Para acessar uma rota protegida, utilize o cabeçalho:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

## 🔒 Limitações de segurança

O UserRules é um projeto educacional, não uma implementação pronta para produção.

* As senhas ficam em texto puro na memória, apenas para simplificar o estudo.
* O segredo JWT está definido diretamente no código e deve ser substituído por uma variável de ambiente em aplicações reais.
* Os usuários são perdidos quando o servidor é reiniciado.
* Não há banco de dados, recuperação de senha, refresh token ou gerenciamento de sessões.
* O JWT é assinado, mas não criptografado: seu conteúdo pode ser decodificado por quem possui o token. Portanto, não se deve armazenar informações confidenciais nele.

Em uma aplicação real, recomenda-se utilizar `bcryptjs` ou `argon2` para armazenar hashes de senha, variáveis de ambiente para segredos, validação rigorosa das entradas e estratégias adequadas para armazenamento e transporte dos tokens.

## 🚀 Próximas melhorias

* [ ] Substituir senhas em texto puro por hashes com `bcryptjs`.
* [ ] Armazenar o segredo JWT em variável de ambiente.
* [ ] Adicionar validação de dados de entrada.
* [ ] Implementar cookies `HttpOnly` para uma estratégia de sessão baseada em cookies.
* [ ] Estudar refresh tokens e revogação de sessões.
* [ ] Adicionar testes automatizados para autenticação e autorização.

## 💡 Aprendizado principal

O UserRules demonstra que **autenticação e autorização são responsabilidades diferentes**.

A autenticação identifica quem está fazendo a requisição. A autorização determina quais recursos essa pessoa pode acessar.

Compreender essa separação é um passo importante para desenvolver APIs seguras, organizadas e fáceis de manter.

---

**Projeto de estudo — Backend / Node.js**

Desenvolvido com o objetivo de consolidar conhecimentos em autenticação, JWT, middlewares e controle de acesso a rotas.
