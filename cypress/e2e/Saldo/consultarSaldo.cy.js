/// <reference types='cypress'/>

import dayjs from 'dayjs';

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

describe('Deve verificar o saldo', () => {

    it('Deve verificar o saldo da conta com sucesso', () => {
        cy.request({
            url:'/saldo',
            method:'GET',
            headers: {Authorization: `JWT ${token}`},

        }).then(res =>{
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
            headers: {Authorization: `JWT ${token}`},
            qs:{ descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res =>{
            cy.request({
                method:'PUT',
                url:`/transacoes/${res.body[0].id}`,
                headers: {Authorization: `JWT ${token}`},
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

        cy.request({
            url:'/saldo',
            method:'GET',
            headers: {Authorization: `JWT ${token}`},

            }).then(res =>{
                let saldoConta = null

                res.body.forEach(C =>{
                    if (C.conta === 'Conta para saldo') saldoConta = C.saldo
                })
                expect(saldoConta).to.be.equal('4034.00')
            })

         })
        
    })
})