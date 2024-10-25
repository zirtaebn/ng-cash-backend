## About the Project  
Application created in a technical challenge from NG.CASH: Structure a fullstack web application, dockerized, aimed at allowing NG users to perform internal transfers among themselves.  
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

### Architecture  
<details>  
  <summary>Users Table:</summary>  
  <ul>  
    <li>id —> PK</li>  
    <li>username (the user's @)</li>  
    <li>password (hashed)</li>  
    <li>accountId —> FK Accounts[id]</li>  
  </ul>  
</details>  

<details>  
  <summary>Accounts Table:</summary>  
  <ul>  
    <li>id —> PK</li>  
    <li>balance</li>  
  </ul>  
</details>  

<details>  
  <summary>Transactions Table:</summary>  
  <ul>  
    <li>id —> PK</li>  
    <li>debitedAccountId —> FK Accounts[id]</li>  
    <li>creditedAccountId —> FK Accounts[id]</li>  
    <li>value</li>  
    <li>createdAt</li>  
  </ul>  
</details>  

### Features  

- [x] Anyone should be able to join NG. To do this, simply register by providing a username and password.  
- [x] It must be ensured that each username is unique and consists of at least 3 characters.  

- [x] It must be ensured that the password consists of at least 8 characters, one number, and one uppercase letter. Remember that it should be hashed when stored in the database.  

- [x] During the registration process of a new user, their respective account should be automatically created in the Accounts table with a balance of R$ 100.00. It is important to note that if an issue occurs and the user is not created, the Accounts table should not be affected.  

- [x] Every user should be able to log in to the application by providing a username and password. If the login is successful, a JWT token (valid for 24 hours) should be provided.  

- [x] Every logged-in user (i.e., one who presents a valid token) should be able to view their current balance. A user A cannot view the balance of a user B, for example.  

- [x] Every logged-in user (i.e., one who presents a valid token) should be able to perform a cash-out by providing the username of the user who will receive the cash-in, provided they have sufficient balance for this. Note that a user should not be able to transfer money to themselves.  

- [x] Every successful new transaction should be recorded in the Transactions table. In cases of transaction failures, the Transactions table should not be affected.  

- [x] Every logged-in user (i.e., one who presents a valid token) should be able to view the financial transactions (cash-out and cash-in) they participated in. If the user did not participate in a particular transaction, they should never have access to it.  

- [x] Every logged-in user (i.e., one who presents a valid token) should be able to filter the financial transactions they participated in by the date of the transaction and/or by cash-out/cash-in transactions;  

### Environment Variables  

To run this project, you will need to add the following environment variables in a .env file  

`PORT`  

`PG_DB`  

`PG_USER`  

`PG_PASSWORD`  

`PG_PORT`  

`JWT_SECRET_KEY`  

## Getting Started  

### Prerequisites  

Before you begin, you will need to have the following tools installed on your machine: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and [Typescript](https://www.typescriptlang.org/).  

### Run Locally  

Clone the project  

```bash  
  git clone https://github.com/zirtaebn/ng-cash-backend.git  
```  

Go to the project directory  

```bash  
  cd ng-cash-backend  
```  

Install the dependencies  

```bash  
  npm install  
```  

Start the server in development mode  

```bash  
  npm run dev  
```  

## Contribution  

<a href="https://github.com/zirtaebn/weather-app--test/graphs/contributors">  
  <img src="https://avatars.githubusercontent.com/u/80608809?s=60&v=4" />  
</a>  
</br>  
Contributions are always welcome!  

## Contact  

Beatriz Sant'Anna - [@zirtaebn](https://twitter.com/zirtaebn) - zirtaebndev@gmail.com  

Project link: [https://github.com/zirtaebn/ng-cash-backend](https://github.com/zirtaebn/ng-cash-backend)  

## Acknowledgments  

Useful resources and libraries that I used in the project.  
 - [Bcrypt](https://www.npmjs.com/package/bcrypt)  
 - [Cors](https://www.npmjs.com/package/cors)  
 - [Dotenv](https://www.npmjs.com/package/dotenv)  
 - [Express](https://www.npmjs.com/package/express)  
 - [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)  
 - [PG - PostgreSQL client for Node.js](https://www.npmjs.com/package/pg)  
 - [PG-HSTORE](https://www.npmjs.com/package/pg-hstore)  
