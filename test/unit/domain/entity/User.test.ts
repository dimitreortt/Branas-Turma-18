import { User } from "../../../../src/domain/entities/User"

it("should create User instance", () => {
    const user = new User('name1', 'email1', 'cpf1', 'carPlate1', 1)
})

it("shoud not create User instance with invalid email", () => {
    expect(() => {
        new User('name1', 'invalidemail', 'cpf1', 'carPlate1', 1)
    }).toThrow("Invalid email")
})

it("shoud not create User instance with invalid cpf", () => {
    expect(() => {
        new User('name1', 'email1', 'invalidcpf', 'carPlate1', 1)
    }).toThrow("Invalid cpf")
})