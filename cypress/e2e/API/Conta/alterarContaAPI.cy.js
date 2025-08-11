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
        cy.request({
            method: 'GET',
            url:'/contas',
            headers: {Authorization: `JWT ${token}`},
            qs:{
                nome: 'Conta para alterar'  
            }   //Foi necessário realizar essa requisição para recuperar o ID da conta com nome 'Conta para alterar'
            
        }).then (res =>{
            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,  // Aqui o ID recuperado foi utilizado
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta alterada via rest'
                }
            }).as('response')

            cy.get('@response').its('status').should('be.equal', 200)
        })
    })
})