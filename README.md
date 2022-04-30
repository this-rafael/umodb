## U.M.O.D.B

## Universal Movie Opinion Database

### Objetivo:

Promover uma aplicação para classificação de filmes.

## Task Progress

|              task               | read | in progress | in documentation | in test | done |
| :-----------------------------: | ---- | ----------- | ---------------- | ------- | ---- |
|    create gateway resolvers     | x    |             |                  |         |      |
|        register operator        | x    |             |                  |         |      |
|         register movies         | x    |             |                  |         |      |
|          update movies          | x    |             |                  |         |      |
|         register actors         | x    |             |                  |         |      |
|    register stream plataform    | x    |             |                  |         |      |
| update stream plataform catalog | x    |             |                  |         |      |
|        register customer        | x    |             |                  |         |      |
|         update customer         | x    |             |                  |         |      |
|           like movie            | x    |             |                  |         |      |
|          unlike movie           | x    |             |                  |         |      |
|       create score movie        | x    |             |                  |         |      |
|        edit movie score         | x    |             |                  |         |      |
|       list actor reviews        | x    |             |                  |         |      |
|       create actor review       | x    |             |                  |         |      |
|        edit actor review        | x    |             |                  |         |      |
|   list basic review on movie    | x    |             |                  |         |      |
|  create basic review on movie   | x    |             |                  |         |      |
|  update basic review on movie   | x    |             |                  |         |      |
|  list comments on basic review  | x    |             |                  |         |      |
|     comment on basic review     | x    |             |                  |         |      |
|  edit commend on basic review   | x    |             |                  |         |      |
|     list full movie review      | x    |             |                  |         |      |
|    create full movie review     | x    |             |                  |         |      |
|    update full moview review    | x    |             |                  |         |      |

## Casos de uso

### Como operador do sistema eu posso me cadastrar no sistema e gerenciar meus dados.

Cada operador do sistema, tem nome email e senha

### Como operador do sistema eu posso cadastrar e atualizar filmes

Cada filme tem um titulo, autor, plataforma de stream, e uma lista de atores

### Como operador do sistema eu posso cadastrar atores

Cada ator tem um nome e uma data de nascimento

### Como operador do sistema eu posso cadastrar plataformas onde se passam os filmes

Cada plataforma tem o seu nome e uma lista de filmes

### Como operador do sistema eu posso remover um filme do catalogo de uma plataforma

### Como cliente eu posso me cadastrar no sistema e gerenciar meus dados.

Cada cliente tem nome, email, senha, genero e data de nascimento

### Como cliente eu posso gostar ou deixar de gostar de um filme.

### Como cliente eu posso classificar o filme de 1 a 5 estrelas

### Como o cliente eu posso editar minha classificação ou apaga-la

### Como cliente eu posso ver as reviews feitas a um ator dentro de um filme

Cada review tem o nome do ator, o nome do filme, uma descrição de texto e o autor daquela postagem

### Como cliente eu posso criar e editar uma review sobre um ator:

### Como cliente eu posso listar resenhas já feitas em um determinado filme

Cada resenha tem um titulo, descrição, data e hora de que foram postados além do nome do criador, uma lista de comentarios sobre a resenha

### Como cliente eu posso escrever uma resenha de um filme ou edita-la.

Cada resenha tem um titulo, descrição, data e hora de que foram postados além do nome do criador, uma lista de comentarios sobre a resenha

### Como cliente eu posso ver todos os comentarios feitos a uma revisão basica

### Como cliente eu posso responder (escrever o comentario) sobre resenhas já feitas em um filme

Cada comentario tem uma descrição, e o nome do criador

### Como cliente eu posso editar um comentario feito feito sobre uma resenha

### Como cliente eu posso ler avaliações completas sobre um filme

A avaliação completa tem:

- Um titulo
- Descrição breve
- Uma descrição sobre os pontos positivos (opcional)
- Uma descrição sobre os pontos negativos (opcional)
- Uma seção de topicos de avalição sobre o filme, onde cada topico será representado por:

  - Titulo do topico, Exemplo: direção
  - Uma avalição de 1 a 5 sobre o topico

- Uma avaliação geral, calculada automaticamente pela formula: SOMATORIO_DAS_AVALIACOES_NOS_TOPICOS / QUANTIDADE_DE_TOPICOS

### Como cliente eu posso escrever e editar avaliações completas sobre um filme
