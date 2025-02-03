import { User } from "../../../../src/domain/entities/User"
import { randomEmail } from "../../util/random"

it("should create User instance", () => {
    User.create('Name One', randomEmail(), '87748248800', 'ABC-1234', 1)
})

it("shoud not create User instance with invalid email", () => {
    expect(() => {
        User.create('Name One', 'invalidemail', '87748248800', 'ABC-1234', 1)
    }).toThrow("Invalid email")
})

it("shoud not create User instance with invalid cpf", () => {
    expect(() => {
        User.create('Name One', randomEmail(), 'invalidcpf', 'ABC-1234', 1)
    }).toThrow("Invalid Cpf")
})

// TODO: test invalid car plate, name