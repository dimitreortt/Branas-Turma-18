import { Email } from "../../../../src/domain/vo/Email"

it("should create an email", async () => {
    const email = new Email('johndoe@email.com')
})

it("should not create an email with invalid value", async () => {
    expect(() => new Email('johndoeemail.com')).toThrow('Invalid email')
})