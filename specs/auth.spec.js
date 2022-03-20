import { expect } from 'chai'
import AuthHelper from '../helpers/auth.helper'

describe('AUTH', () => {
    let authHelper = new AuthHelper()
    describe('SUCCESSFUL LOG IN', () => {
        before(async () => {
            await authHelper.login(process.env.LOGIN, process.env.PASSWORD)
    })

        it('Response status code is 200', () => {
           expect(authHelper.response.statusCode).to.eq(200)
        })

        it('Response body contains authorization token', () => {
            expect(authHelper.response.body.token).not.to.be.undefined
        })
    })


    describe('LOG IN WITH INVALID CREDENTIALS', () => {
        before(async () => {
            await authHelper.login('invalid', 'invalid')
        })

        it('Response status code is 404', () => {
            expect(authHelper.response.statusCode).to.eq(404)
        })

        it('Response body contains error message', () => {
            expect(authHelper.response.body.message).to.eq('Wrong login or password.')
        })
    })
})