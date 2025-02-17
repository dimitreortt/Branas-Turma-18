### Three Laws of TDD

Você não pode escrever nenhum código até ter escrito um teste que detecte uma possível falha.
Você não pode escrever mais testes de unidade do que o suficiente para detectar a falha.
Você não pode escrever mais código do que o suficiente para passar nos testes.

(Robert C. Martin)



### Run Jest

npx jest --watchAll --passWithNoTests
npx jest <path_to_file>


### Good flow for TDD:
we have to firstly create the building blocks for the first usecase, which is SignUp (CreateUser), 
this implicity says that the first usecase actually is GetUser, so we can start as:

* create a test for GetUser, which will use UserDAO, so:
* create a test for UserDAO

final order will be:

1. create a test for UserDAO (and the passing implementation)
2. create a test GetUser usecase
3. create a test for CreateUser usecase

Overall mentality: dig into the next feature (usecase) and find out which are the building blocks, and build them bottom to top.

Other option?: first start the usecase test and then go to the others (use case driven development)

###
Esperando acabar o curso pra saber se vou refatorar:
* daos e repos retornando dto no lugar de entity
* no final onde vai ficar esse Registry que criei?
* considerando se vou refatorar os retornos dos usecases, no momento criei DTOs só pra isso, posso fazer como ele fez na aula 3, só definir type Input Output, sem criar a classe da DTO
* seria um fluxo bem legal, retornar entity do repository e não DTO... (legal também não ter DAO, só repo (costume mesmo))


### 
O que eu contrataria terceiros para eu não implementar: (not core domain)
• Processamento do pagamento (Genérico)
• Emissão de nota fiscal (Genérico)
• Gestão do estoque (Genérico)
• Assinatura digital dos contratos (Genérico)
• Processamento do pagamento (Genérico)