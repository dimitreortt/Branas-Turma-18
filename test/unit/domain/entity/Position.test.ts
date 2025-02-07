import { Position } from "../../../../src/domain/vo/Position"
import { randomLat, randomLong, randomUUID } from "../../util/random"

it("should create a position", async () => {
   const position = Position.create(randomUUID(), randomLat(), randomLong(), new Date())
   expect(typeof position.getPositionId()).toBe('string')
})