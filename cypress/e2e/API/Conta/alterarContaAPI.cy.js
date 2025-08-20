/// <reference types='cypress'/>

before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')

})

beforeEach(() =>{
    cy.resetRest()
})

describe ('Deve realizar alteração da conta via API rest', () =>{

    it('Deve altera a conta via API rest com sucesso', () =>{
        cy.getContaByName('Conta para alterar').then (res =>{
            cy.request({
                method: 'PUT',
                url: `/contas/${res}`,  // Aqui o ID recuperado foi utilizado
                body:{
                    nome: 'Conta alterada via rest'
                }
            }).as('response')

            cy.get('@response').its('status').should('be.equal', 200)
        })
    })
})