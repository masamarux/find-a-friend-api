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
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada // ligar com o rbca
- [x] Fotos dos pets devem ser guardadas num serviço de cdn

## Requisitos não funcionais
- [x] Os dados devem estar persistidos num banco de dados Postgres
- [x] CDN utilizado deve ser o S3
- [x] Senhas devem ser criptografadas
- [x] O usuário deve ser autenticado com um JWT
- [] O sistema de autenticação deve utilizar RBAC
- [x] Os dados devem estar paginados com padrão de 10 itens
- [] A aplicação deve ter testes unitários e E2E
- [] A aplicação deve entregar erros padronizados
- [x] A aplicação deve utilizar um sistema de logs
- [x] As rotas devem validar os dados da requisição

## Lista de testes unitários
### signup-org
- [x] Deve se cadastrar normalmente
- [x] Deve falhar ao cadastrar uma org já existente
- [x] Deve senha deve ser um hash correto ao cadastrar
### signin-org
- [x] Deve logar corretamente
- [x] Deve falhar caso não tenha cadastro
- [x] Deve falhar caso a senha esteja incorreta
### register-pet
- [] Deve cadastrar corretamente o pet
- [] As imagens devem estar inseridas corretamente no cdn
### get-pet
- [] Deve retornar dados de um pet existente
- [] Deve falhar caso retorne um pet inexistente
- [] Deve retornar fotos do pet com link
### fetch-adoptions
- [x] Deve retornar lista de adoções existentes
- [x] Deve ser capaz de retornar uma lista vazia caso não existam itens

## Lista testes E2E
### /orgs/signup
- [] Cadastro não deve retornar dados sensíveis como password
- [] Deve falhar caso enviado parametros incorretos
### /orgs/sessions
- [] Deve retornar um jwt corretamente
### /pets
- [] Deve falhar se não logado
- [] Deve cadastrar um pet corretamente
### /pets/:id
- [] Deve falhar ao não enviar um id de pet
- [] Deve retornar um pet existente
### /adoptions
- [] Deve ter o tamanho de itens padrão de 10 por página