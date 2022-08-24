describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'midudev',
      name: 'Miguel',
      password: 'lamidupassword'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be open', () => {
    cy.contains('Notes')
  })

  it('login form can be open', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()

    // cy.get('input:first').type('midudev')
    // cy.get('input:last').type('lamidupassword')

    // cy.get('input').first().type('midudev')
    // cy.get('input').last().type('lamidupassword')

    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('lamidupassword')

    cy.contains('Login').click()

    cy.contains('Show create note')
  })

  it('login fails when password is incorrect', () => {
    cy.contains('Show login').click()

    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('password-incorrecta')

    cy.contains('Login').click()

    cy.contains('Wrong credentials')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'midudev', password: 'lamidupassword' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'

      cy.contains('Show create note').click()
      cy.get('input').type(noteContent)
      cy.contains('Save Note').click()

      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'cypress first note',
          important: false
        })
        cy.createNote({
          content: 'cypress second note',
          important: false
        })
        cy.createNote({
          content: 'cypress third note',
          important: false
        })
      })

      it('it can be made important', () => {
        cy.contains('cypress second note').parent().contains('make important').click().as('theNote')

        cy.get('@theNote').contains('make not important')
      })
    })
  })
})
