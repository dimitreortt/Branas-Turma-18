import { DistanceCalculator } from "../../../../src/domain/service/DistanceCalculator";
import { Coords } from "../../../../src/domain/vo/Coords";

it("should calculate the distance between coords", async () => {
    const from = new Coords(-27.584905257808835, -48.545022195325124);
	const to = new Coords(-27.496887588317275, -48.522234807851476);
	expect(DistanceCalculator.calculate(from, to)).toBe(10);
})