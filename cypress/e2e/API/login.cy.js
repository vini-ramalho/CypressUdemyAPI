/// <reference types='cypress'/>

describe('Fazer uma requisição do tipo post para login', () =>{

    it('Deve realizar a requisão de login com sucesso', () =>{

        cy.request({
            method: 'POST',
            url: 'http://barrigarest.wcaquino.me/signin',
            body:{
                email: "alvesferreira.rvinicius@gmail.com",
                redirecionar: false,
                senha: "meg"
            }
        }).its('body.token').should('not.be.empty')
    })
})