import { User } from "../../../../src/domain/entities/User"
import { UserRepository } from "../../../../src/infra/repository/UserRepository"
import { DatabaseMock } from "../../../mocks/DatabaseMock"

let database: any

beforeAll(async () => {
   database = await new DatabaseMock().build()
})

it("should save an user", async () => {
    const user = new User('Name2', 'email2@mail.com', 'Cpf2', 'CarPlate2', 2)
    const userRepo = new UserRepository(database)

    userRepo.save(user)

    const result = await database.query('SELECT * FROM online_taxi.user WHERE email = $1', [user.email])
    expect(result[0]).not.toBeNull()
    expect(result[0]!.email).toBe(user.email)
    expect(result[0]!.cpf).toBe(user.cpf)
    expect(result[0]!.car_plate).toBe(user.carPlate)
    expect(result[0]!.user_type).toBe(user.userType)
})