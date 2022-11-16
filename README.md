## Sobre o projeto
Aplicação feita em um desafio técnico da NG.CASH: Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.
### Stacks
<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://sequelize.org/">Sequelize</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

### Arquitetura
<details>
  <summary>Tabela Users:</summary>
  <ul>
    <li>id —> PK</li>
    <li>username (o @ do usuário)</li>
    <li>password (hasheada)</li>
    <li>accountId —> FK Accounts[id]</li>
  </ul>
</details>

<details>
  <summary>Tabela Accounts:</summary>
  <ul>
    <li>id —> PK</li>
    <li>balance</li>
  </ul>
</details>

<details>
  <summary>Tabela Transactions:</summary>
  <ul>
    <li>id —> PK</li>
    <li>debitedAccountId —> FK Accounts[id]</li>
    <li>creditedAccountId —> FK Accounts[id]</li>
    <li>value</li>
    <li>createdAt</li>
  </ul>
</details>



### Funcionalidades

- [x] Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando username e password.
- [x] Deve-se garantir que cada username seja único e composto por, pelo menos, 3 caracteres.

- [x] Deve-se garantir que a password seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser hashada ao ser armazenada no banco.

- [x] Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela Accounts com um balance de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado,  a tabela Accounts não deverá ser afetada.

- [x] Todo usuário deverá conseguir logar na aplicação informando username e password. Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.

- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio balance atual. Um usuário A não pode visualizar o balance de um usuário B, por exemplo.

- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um cash-out informando o username do usuário que sofrerá o cash-in), caso apresente balance suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.

- [x] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions. Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada.

- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.

- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por data de realização da transação e/ou transações de cash-out/cash-in;



### Variáveis de ambiente

Para rodar esse projeto, você precisará adicionar as seguintes variaveis de ambiente em um arquivo .env

`PORT`

`PG_DB`

`PG_USER`

`PG_PASSWORD`

`PG_PORT`

`JWT_SECRET_KEY`

## Começando

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) e [Typescript](https://www.typescriptlang.org/).
   
### Rodar localmanente

Clone o projeto

```bash
  git clone https://github.com/zirtaebn/ng-cash-backend.git
```

Vá para o diretório do projeto

```bash
  cd ng-cash-backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor no modo desenvolvedor

```bash
  npm run dev
```

## Contribuição

<a href="https://github.com/zirtaebn/weather-app--test/graphs/contributors">
  <img src="https://avatars.githubusercontent.com/u/80608809?s=60&v=4" />
</a>
</br>
Contribuições são sempre bem vindas!

## Contato

Beatriz Sant'Anna - [@zirtaebn](https://twitter.com/zirtaebn) - zirtaebndev@gmail.com

Link do projeto: [https://github.com/zirtaebn/ng-cash-backend](https://github.com/zirtaebn/ng-cash-backend)


## Reconhecimentos

Recursos e bibliotecas úteis que utilizei no projeto.
 - [Bcrypt](https://www.npmjs.com/package/bcrypt)
 - [Cors](https://www.npmjs.com/package/cors)
 - [Dotenv](https://www.npmjs.com/package/dotenv)
 - [Express](https://www.npmjs.com/package/express)
 - [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
 - [PG - PostgreSQL client for Node.js](https://www.npmjs.com/package/pg)
 - [PG-HSTORE](https://www.npmjs.com/package/pg-hstore)