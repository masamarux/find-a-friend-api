# Find a friend api

## Requisitos Funcionais
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionais
- [x] Os dados devem estar persistidos num banco de dados Postgres
- [x] Senhas devem ser criptografadas
- [ ] O usuário deve ser autenticado com um JWT
- [ ] Os dados devem estar paginado com padrào de 10 itens
- [ ] A aplicação deve ter testes unitários e E2E
- [ ] A aplicação deve utilizar um sistema de logs
- [ ] As rotas devem validar os dados da requisição