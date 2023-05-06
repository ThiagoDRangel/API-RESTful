# Boas-vindas ao repositório do Projeto Store Manager

Esta API tem como objetivo armazenar e catalogar todas as armas e itens mágicos em posse dos vingadores.  É uma tecnologia em desenvolvimento em parceria com os Laboratórios Stark.

## Configurações iniciais

Dê uma boa olhada e me contrate antes da próxima invasão da terra.

# API RESTFUL

<details>
  <summary><strong> O que foi desenvolvido?</strong></summary>

### Variáveis de ambiente

- Para utilizar o projeto

  ```sh
    MYSQL_HOST=localhost
    MYSQL_USER=nome
    MYSQL_PASSWORD=1234
    PORT=3001
    HOST=localhost
  ```

    - A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente tanto na máquina local quanto no avaliador.
  - Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
    Como o arquivo `.env` não será enviado para o GitHub (não se preocupe com isso, pois já está configurado no `.gitignore`), o avaliador utilizará as suas próprias variáveis de ambiente.

  ```javascript
  const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  ```

    <br />
  </details>

<details>
  <summary id="dicas"><strong>👀 Dicas</strong></summary>

#### Tabelas

O banco terá três tabelas:

- A tabela `products`, com os atributos `id` e `name`;
- A tabela `sales`, com os atributos `id` e `date`;
- A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
- O script de criação do banco de dados;
- O script que popula o banco de dados;

A tabela `products` tem o seguinte formato: _(O id será gerado automaticamente)_

A tabela `sales` tem o seguinte formato: _(O id e date são gerados automaticamente)_

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato: _(O produto e a venda são deletados automaticamente)_

#### Dicas de scripts prontos

- Criar o banco de dados e gerar as tabelas:

```sh
  npm run migration
```

- Limpar e popular o banco de dados:

```sh
  npm run seed
```

- Iniciar o servidor Node:

```sh
  npm start
```

- Iniciar o servidor Node com nodemon:

```sh
  npm run dev
```

- Executar os testes avaliativos da Trybe:

```sh
  npm test
```

- Executar os testes de unidade escritos por você:

```sh
  npm run test:mocha
```

- Executar o linter:

```sh
  npm run lint
```

  <br />
</details>

<details id="Quem testa os testes?">
  <summary><strong>🔬 Escrevendo testes de unidade</strong></summary><br />

- Foi utilizado **mocha**, **chai** e **sinon** para escrever os testes;
- `models`, `services` e `controllers` dentro da pasta `tests/unit`.

```tree
.
├─ ...
├─ src
├─ tests
│   └─ unit
|       ├─ controllers
│           ├─ productsControllers.test.js
│           └─ salesControllers.test.js
|       ├─ services
│           ├─ productsServices.test.js
│           └─ salesServices.test.js
|       └─ models
│           ├─ productsModels.test.js
│           └─ salesModels.test.js
└─ ...
```

  <br />

</details>

<details>
  <summary><strong>🗣 Gostou? Então me contrata!</strong></summary>

- https://www.linkedin.com/in/thiagodrangel/
- info.tec.campos@gmail.com
   <br />

</details>