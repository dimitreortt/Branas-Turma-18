import { User } from "../../../../src/domain/entities/User"
import { UserRepository } from "../../../../src/infra/repository/UserRepository"
import { DatabaseMock } from "../../../mocks/DatabaseMock"

let database: any

beforeAll(async () => {
   database = await new DatabaseMock().build()
})

it("should save an user", async () => {
    const user = User.create('Name Two', 'email2@mail.com', '87748248800', 'ABC-1234', 2)
    const userRepo = new UserRepository(database)

    await userRepo.save(user)

    const result = await database.query('SELECT * FROM online_taxi.user WHERE email = $1', [user.getEmail()])
    expect(result[0]).toBeTruthy()
    expect(result[0]!.email).toBe(user.getEmail())
    expect(result[0]!.cpf).toBe(user.getCpf())
    expect(result[0]!.car_plate).toBe(user.getCarPlate())
    expect(result[0]!.user_type).toBe(user.userType)
})