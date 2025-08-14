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

describe('Inserção de contas via API', () =>{

    it('Deve criar uma conta com sucesso', () =>{
                cy.request({
                    method: 'POST',
                    headers:{Authorization: `JWT ${token}`},
                    url: '/contas',
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

    it('Não deve permitir criar uma conta com nome duplicado', () =>{
                cy.request({
                    method: 'POST',
                    headers:{Authorization: `JWT ${token}`},
                    url: '/contas',
                    body:{
                        nome:'Conta mesmo nome'
                    },
                    failOnStatusCode: false
                }).as('response')

            cy.get('@response').then(res => {
                console.log(res)
                expect(res.status).to.be.equal(400) 
                expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
                
            })
    })
})