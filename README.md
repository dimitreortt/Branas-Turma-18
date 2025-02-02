### Three Laws of TDD

Você não pode escrever nenhum código até ter escrito um teste que detecte uma possível falha.
Você não pode escrever mais testes de unidade do que o suficiente para detectar a falha.
Você não pode escrever mais código do que o suficiente para passar nos testes.

(Robert C. Martin)



### Run Jest

env TEST_FILE=<file_to_run> npx jest --watchAll --passWithNoTests
(don't pass file to run all files)



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
