/// <reference types='cypress'/>

let token

before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')
        .then(tkn => {
            token = tkn
        })
})

beforeEach(() =>{
    cy.resetRest(token)
})

describe ('Deve realizar alteração da conta via API rest', () =>{

    it('Deve altera a conta via API rest com sucesso', () =>{
        cy.getContaByName('Conta para alterar').then (res =>{
            cy.request({
                method: 'PUT',
                url: `/contas/${res}`,  // Aqui o ID recuperado foi utilizado
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta alterada via rest'
                }
            }).as('response')

            cy.get('@response').its('status').should('be.equal', 200)
        })
    })
})