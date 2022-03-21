import { expect } from 'chai'
import UsersHelper from '../helpers/users.helper'
import { getRandomItem } from '../helpers/common.helper'
import ConfigHelper from "../helpers/config.helper";

describe('USERS', () => {
    let userHelper = new UsersHelper()
    let userID

    before(async () => {
        await userHelper.create()
        userID = userHelper.response.body.id
    })

    after(async function() {
        const configHelper = new ConfigHelper()
        await configHelper.wipeData()
    })

    describe('USER CREATION', () => {
        it('Response status code is 200', () => {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('Response body contains user id', () => {
            expect(userHelper.response.body.id).not.to.be.undefined
        })

        it('Response body contains initial amount', () => {
            expect(userHelper.response.body.amount).not.to.be.undefined
        })
    })

    describe('GET USER BY ID', () => {
        before(async function() {
            await userHelper.getById(userID)
        })

        it('Response status code is 200', () => {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('Response body contains user id', () => {
            expect(userHelper.response.body.id).not.to.be.undefined
        })

        it('Response body contains initial amount', () => {
            expect(userHelper.response.body.amount).not.to.be.undefined
        })
    })


    describe('GET ALL USERS', () => {
        before(async function() {
            await userHelper.create()
            await userHelper.getAll()
        })

        it('Response status code is 200', () => {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('Response body contains list of 2 or more items', () => {
            expect(userHelper.response.body.length).to.be.at.least(2)
        })

        it('Response body array item contains user id', () => {
            expect(getRandomItem(userHelper.response.body).id).not.to.be.undefined
        })

        it('Response body array item contains initial amount', () => {
            expect(getRandomItem(userHelper.response.body).amount).not.to.be.undefined
        })
    })


    describe('DELETE USER', () => {
        before(async function() {
            await userHelper.delete(userID)
        })

        it('Response status code is 200', () => {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('Response body contains success message', () => {
            expect(userHelper.response.body.message).to.eq('User deleted.')
        })

    })

})