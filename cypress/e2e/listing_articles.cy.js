describe('get list of articles from the api', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Latest News Added')
    cy.get('ul li').first().should('contain', 'The Best Labor Day Sales on MacBooks, AirPods and Apple Watches')
  })
})
