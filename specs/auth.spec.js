import supertest from 'supertest'
import { expect } from 'chai'

describe('AUTH', () => {
    const request = supertest(process.env.BASE_URL)

    describe('SUCCESSFUL LOG IN', () => {
        let result
        before(async () => {
            await request
                .post('/auth')
                .send({login: process.env.LOGIN, password: process.env.PASSWORD})
                .then(res => {
                    result = res
                })
            })

        it('Response status code is 200', () => {
           expect(result.statusCode).to.eq(200)
        })

        it('Response body contains authorization token', () => {
            expect(result.body.token).not.to.be.undefined
        })
    })


    describe('LOG IN WITH INVALID CREDENTIALS', () => {
        let result
        before(async () => {
            await request
                .post('/auth')
                .send({login: 'invalid', password: 'invalid'})
                .then(res => {
                    result = res
                })
            })

        it('Response status code is 404', () => {
            expect(result.statusCode).to.eq(404)
        })

        it('Response body contains error message', () => {
            expect(result.body.message).to.eq('Wrong login or password.')
        })
    })
})