import { Coords } from "../../../../src/domain/entities/Coords"

it("should create a Coords", () => {
    const lat = -27.584905257808835
    const long = -48.545022195325124

    const coords = new Coords(lat, long)
    
    expect(coords.getLat()).toBe(lat)
    expect(coords.getLong()).toBe(long)
})

it("should not create coords with invalid input", () => {
    const lat = -27.584905257808835
    const long = -48.545022195325124
    
    expect(() => new Coords(-91, long)).toThrow('Invalid latitude')
    expect(() => new Coords(91, long)).toThrow('Invalid latitude')
    expect(() => new Coords(lat, -181)).toThrow('Invalid longitude')
    expect(() => new Coords(lat, 181)).toThrow('Invalid longitude')
})