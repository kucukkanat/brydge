import { Peer } from "./client"
describe('Client suite', () => {
    // beforeEach(() => {
    //     // Cypress starts out with a blank slate for each test
    //     // so we must tell it to visit our website with the `cy.visit()` command.
    //     // Since we want to visit the same URL at the start of all our tests,
    //     // we include it in our beforeEach function so that it runs before each test
    //     cy.visit('https://example.cypress.io/todo')
    // }) 
    it("Construct the Peer", () => {
        const peer1 = new Peer()
        const peer2 = new Peer()
        setTimeout(() => {
            peer2.connect(peer1.id)

        }, 1000)

        setTimeout(() => {
            console.log(peer2)
            // peer1.send(peer2.id, "Hello World")
        }, 3000);

    })
})

