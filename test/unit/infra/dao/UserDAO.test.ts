import { UserDAOI } from "../../../../src/domain/dao/UserDAOI"
import { UserDAO } from "../../../../src/infra/dao/UserDAO"
import { DatabaseMock } from "../../../mocks/DatabaseMock"
import { randomUUID } from "../../util/random"

let database: DatabaseMock
let userDao: UserDAOI

beforeAll(async () => {
    database = await new DatabaseMock().build()
    userDao = new UserDAO()
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

it("should get a user by id", async () => {
    const userEmail = `john.doe${Math.random()}@example.com`
    const { user_id } = await database.addDummyUser1(userEmail)
    const user1 = await userDao.getUserById(user_id)
    expect(user1).not.toBeNull()
})

it("should not get a user by id if user does not exist", async () => {
    const user1 = await userDao.getUserById(randomUUID())
    expect(user1).toBeNull()
})