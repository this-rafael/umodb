## Expicação geral:

Para registar um operador, deve-se executar 3 passos simples:

1. Obter um id de subscrição para obter o resultado da criação do operador em tempo real
2. Utilizar o id de subcrição para criar uma subscrição graphql
3. Emitir uma mutação graphql informando os dados do idSubscription e os dados do operados

### Acesse o endpoint: http://localhost:3000/graphql

#### Passo 1:

Request:

```
query {
  getUniqueId {
    id
  }
}
```

Response:

```
{
  "data": {
    "getUniqueId": {
      "id": "09ade267-63d9-42b2-a304-fa2c1544a0cb-a2e8c06e-a277-462a-a35e-92587a8eb3e1-0.6037015083407837-1652202207946"
    }
  }
}
```

#### Passo 2:

Request

```
subscription subscription_subscri418 {
  subscribeOperatorCreation(
    id: "09ade267-63d9-42b2-a304-fa2c1544a0cb-a2e8c06e-a277-462a-a35e-92587a8eb3e1-0.6037015083407837-1652202207946"
  ) {
    createdAt
    name
    email
  }
}
```

Response: (Resultado async será visto após mutação)

#### Passo 3:

Request

```
mutation {
  registerOperator(
    subscriptionId: "09ade267-63d9-42b2-a304-fa2c1544a0cb-a2e8c06e-a277-462a-a35e-92587a8eb3e1-0.6037015083407837-1652202207946"

    operator: { name: "Rafael S Pereira", email: "contato.dev.rafael.pereira@gmail.com", password: "*********" }
  ) {
    expectedResultAt
    createdAt
  }
}

```

Response

```
{
  "data": {
    "registerOperator": {
      "expectedResultAt": "2022-05-10T17:09:10.820Z",
      "createdAt": "2022-05-10T17:09:05.820Z"
    }
  }
}

```
