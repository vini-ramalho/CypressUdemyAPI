/// <reference types='cypress'/>

import dayjs from 'dayjs';


before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')

})

beforeEach(() =>{
    cy.resetRest()
})

describe('Deve verificar o saldo', () => {

    it('Deve verificar o saldo da conta com sucesso', () => {
        cy.getSaldo().then(res =>{
            let saldoConta = null

            res.body.forEach(C =>{
                if (C.conta === 'Conta para saldo') saldoConta = C.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })

    it('Deve alterar uma movimentação e validar o saldo', () =>{
        cy.request({
            method:'GET',
            url:'/transacoes',
            qs:{ descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res =>{
            cy.request({
                method:'PUT',
                url:`/transacoes/${res.body[0].id}`,
                body:{
                    status:true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).as('response')
            cy.get('@response').its('status').should('be.equal', 200)

            cy.getSaldo().then(res =>{
                let saldoConta = null

                res.body.forEach(C =>{
                    if (C.conta === 'Conta para saldo') saldoConta = C.saldo
                })
                expect(saldoConta).to.be.equal('4034.00')
            })

         })
        
    })
})