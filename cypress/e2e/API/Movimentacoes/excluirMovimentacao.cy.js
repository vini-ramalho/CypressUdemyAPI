/// <reference types='cypress'/>


before(() =>{
     cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg')
})

beforeEach(() =>{
    cy.resetRest()
})

describe ('Deve realizar a exclusão da movimentação', () =>{

    it('Deve realiazr a exclusão da moviumentação com sucesso', () =>{
            cy.request({
                method:'GET',
                url:'/transacoes',
                qs:{ descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                method:'DELETE',
                url:`/transacoes/${res.body[0].id}`,
            }).its('status').should('be.equal', 204)
        })

    })
})