import { GetRide } from "../../src/application/query/GetRide"
import { RideDAOI } from "../../src/domain/dao/RideDAOI"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { Registry } from "../../src/infra/di/Registry"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomInt, randomUUID } from "../unit/util/random"

let database: DatabaseMock
let rideDao: RideDAOI

beforeAll(async () => {
	database = await new DatabaseMock().build()
    Registry.getInstance().provide('database', database)
    Registry.getInstance().provide('rideDao', new RideDAO())
})

it("should get a ride", async () => {
	const { ride_id: rideId, passenger_id: passengerId } = await database.addFakeRide()
	const getRide = new GetRide()
	const input = { rideId }
	const output = await getRide.execute(input)

	expect(output).toBeTruthy()
	expect(output.rideId).toBe(rideId)
	expect(output.passengerId).toBe(passengerId)
})
