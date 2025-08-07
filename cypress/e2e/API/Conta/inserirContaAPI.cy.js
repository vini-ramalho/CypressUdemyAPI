/// <reference types='cypress'/>

let token

before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')
        .then(tkn => {
            token = tkn
        })
})

describe('Fazer uma requisição do tipo post para inserir uma conta', () =>{

    it('Deve criar uma conta com sucesso', () =>{

                cy.request({
                    method: 'POST',
                    headers:{Authorization: `JWT ${token}`},
                    url: 'https://barrigarest.wcaquino.me/contas',
                    body:{
                        nome:'Conta via rest'
                    }
                }).as('response')

            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Conta via rest')
            })
    })
})