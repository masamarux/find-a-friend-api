# Find a friend api

## Requisitos Funcionais
- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

## Regras de negócio
- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionais
- [] Os dados devem estar persistidos num banco de dados Postgres
- [] Senhas devem ser criptografadas
- [] O usuário deve ser autenticado com um JWT
- [] Os dados devem estar paginado com padrào de 10 itens
- [] A aplicação deve ter testes unitários e E2E
- [] A aplicação deve utilizar um sistema de logs