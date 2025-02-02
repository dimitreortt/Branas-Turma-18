import { CarPlate } from "../../../../src/domain/entities/CarPlate"

it("should create carPlates", async () => {
    new CarPlate("ABC-1234") // ✅ true (Formato antigo)
    new CarPlate("ABC1D23") // ✅ true (Formato Mercosul)
})

it("should not create carPlates with invalid plates", async () => {
    expect(() => new CarPlate("1234-ABC")).toThrow("Invalid car plate")
    expect(() => new CarPlate("AB1C234")).toThrow("Invalid car plate")
})