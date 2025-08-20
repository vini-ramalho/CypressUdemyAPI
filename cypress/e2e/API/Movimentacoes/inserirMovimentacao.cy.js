/// <reference types='cypress'/>

import dayjs from 'dayjs';


before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')
})

beforeEach(() =>{
    cy.resetRest()
})

describe('Inserção de movimentações via API', () =>{

    it('Deve inserir uma movimentaçaõ com sucesso', () =>{
        cy.getContaByName('Conta para movimentacoes').then(contaID =>{
            cy.request({
                method: 'POST',
                url: '/transacoes',
                body:{
                    conta_id: contaID,
                    data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                    data_transacao: dayjs().format('DD/MM/YYYY'),
                    descricao:"desc",
                    envolvido:"inter",
                    status: true,
                    tipo:"REC",
                    valor: "123"
                }
            }).as('response')

        })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    })


})