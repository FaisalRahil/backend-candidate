const chai = require('chai')
const { assert, expect } = chai;
const Candidate = require('../../../models/Candidate')


describe('testing candidates model', () => {


    it('', () => {
        let candidateData = {
            name: "shafiq",
            slug: "aaaaaa",
            description: "Candidate",
            website: "https://www.google.com",
            phone: "2188287623",
            email: "s@lc.com",
            address: "hay andalus",
            location: {
                type: "Point",
                coordinates: [13.234, 32.2334],
                formattedAddress: "hay andalus",
                street: "Bashir assedwie street",
                city: "tripoli",
                state: "tripoli",
                zipcode: "234232",
                country: "Libya"

            },
            careers: "Mobile Development",
            averageRating: 5,
            averageCost: 250000000

        }

        const candidate = Candidate.create(candidateData)
        candidate.then(data => {

            assert.isNotNull(candidate)
            
        })
    })

})