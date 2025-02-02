import { UserDAOI } from "../../../../src/domain/dao/UserDAOI"
import { UserDAO } from "../../../../src/infra/dao/UserDAO"
import { DatabaseMock } from "../../../mocks/DatabaseMock"

let database: DatabaseMock
let userDao: UserDAOI

beforeAll(async () => {
    database = await new DatabaseMock().build()
    userDao = new UserDAO(database)
})

it("should get a user by email", async () => {
    const userEmail = 'john.doe@example.com'
    await database.addDummyUser1(userEmail)
    const user1 = await userDao.getUserByEmail(userEmail)
    expect(user1).not.toBeNull()
})

it("should not get a user by email if the email is not registered", async () => {
    const user2 = await userDao.getUserByEmail('unknownemail')
    expect(user2).toBeNull()
})