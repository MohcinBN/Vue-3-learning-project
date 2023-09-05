describe('get list of articles from the api', () => {
    it('visits the app root url', () => {
        cy.visit('/')
        cy.get('.pagination').first().should('exist').should('contain', 'Previous')
        cy.get('.pagination').eq(0).should('exist').should('contain', 'Next')
    })
})
