/// <reference types='cypress'/>

describe('Fazer uma requisição do tipo post para login', () =>{

    it('Deve realizar a requisão de login com sucesso', () =>{

        cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg') //Foi criado um comando no Cypress para receber o token do login
    })
})