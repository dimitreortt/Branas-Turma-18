import { Name } from "../../../../src/domain/vo/Name";

it("should create a name", async () => {
    const name = new Name('Valid Name');
})

it("should not create a name with invalid value", async () => {
    expect(() => new Name('InvalidName')).toThrow('Invalid name')
    expect(() => new Name('')).toThrow('Invalid name')
})