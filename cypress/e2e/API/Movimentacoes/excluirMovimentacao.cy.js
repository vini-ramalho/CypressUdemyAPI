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

describe ('Deve realizar a exclusão da movimentação', () =>{

    it('Deve realiazr a exclusão da moviumentação com sucesso', () =>{
            cy.request({
                method:'GET',
                url:'/transacoes',
                headers: {Authorization: `JWT ${token}`},
                qs:{ descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                method:'DELETE',
                url:`/transacoes/${res.body[0].id}`,
                headers:{Authorization: `JWT ${token}`}
            }).its('status').should('be.equal', 204)
        })

    })
})