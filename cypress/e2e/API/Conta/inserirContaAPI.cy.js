/// <reference types='cypress'/>

describe('Fazer uma requisição do tipo post para inserir uma conta', () =>{

    it('Deve criar uma conta com sucesso', () =>{

        cy.request({
            method: 'POST',
            url: 'http://barrigarest.wcaquino.me/signin',
            body:{
                email: "alvesferreira.rvinicius@gmail.com",
                redirecionar: false,
                senha: "meg"
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'POST',
                    headers:{Authorization: `JWT ${token}`},
                    url: 'https://barrigarest.wcaquino.me/contas',
                    body:{
                        nome:'Conta via rest'
                    }
                }).as('response')
            })

            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Conta via rest')
            })
    })
})