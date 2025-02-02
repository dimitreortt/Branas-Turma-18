import { CreateUserInput } from "../../src/application/dto/CreateUserInput"
import { CreateUser } from "../../src/application/usecase/CreateUser"
import { UserDAOI } from "../../src/domain/dao/UserDAOI"
import { UserDAO } from "../../src/infra/dao/UserDAO"
import { UserRepository, UserRepositoryI } from "../../src/infra/repository/UserRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"

let database: DatabaseMock
let userDao: UserDAOI
let userRepo: UserRepositoryI
let createUser: CreateUser

beforeAll(async () => {
   database = await new DatabaseMock().build()
   userDao = new UserDAO(database)
   userRepo = new UserRepository(database)
   createUser = new CreateUser(userDao, userRepo)
})

it("should create a new user", async () => {
    const input = new CreateUserInput('Name Three', 'email3@mail.com', '97456321558', 'ABC-1234', 2)
    const output = await createUser.execute(input)
    expect(output).toHaveProperty("id")

    const userDB = await userDao.getUserByEmail(input.email)
    expect(userDB).toEqual(expect.objectContaining(input))
})

it("should not create a user with email that is already being used", async () => {
    const input = new CreateUserInput('Name Four', 'email4@mail.com', '71428793860', 'ABC-1235', 2)
    await createUser.execute(input)
    await expect(
        createUser.execute(input)
    ).rejects.toThrow('Email already being used');
})