import { GetUserInput } from "../../src/application/dto/GetUserInput"
import { GetUser } from "../../src/application/query/GetUser"
import { UserDAO } from "../../src/infra/dao/UserDAO"
import { DatabaseMock } from "../mocks/DatabaseMock"

let database: any
let userDao: UserDAO
let getUser: GetUser

beforeAll(async () => {
   database = await new DatabaseMock().build()
   userDao = new UserDAO()
   getUser = new GetUser(userDao)
})

it("should get a user from email", async () => {
    const userEmail = "user1@example.com"
    const user1 = await database.addDummyUser1(userEmail)
    const getUserInput = new GetUserInput(userEmail)
    const getUserOutput = await getUser.execute(getUserInput)
    expect(getUserOutput).not.toBeNull()
    expect(getUserOutput!.user.email).toBe(userEmail)
    expect(getUserOutput!.user.cpf).toBe(user1.cpf)
    expect(getUserOutput!.user.userId).toBe(user1.user_id)
    expect(getUserOutput!.user.carPlate).toBe(user1.car_plate)
    expect(getUserOutput!.user.userType).toBe(user1.user_type)
})

it("should not get a user that does not exist", async () => {
    const getUserInput = new GetUserInput('unknownemail')
    const getUserOutput = await getUser.execute(getUserInput)
    expect(getUserOutput).toBeNull()
})