import { GetRideInput } from "../../src/application/dto/GetRideInput"
import { GetRide } from "../../src/application/query/GetRide"
import { RideDAOI } from "../../src/domain/dao/RideDAOI"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomInt, randomUUID } from "../unit/util/random"

let database: DatabaseMock
let rideDao: RideDAOI

beforeAll(async () => {
	database = await new DatabaseMock().build()
	rideDao = new RideDAO(database)
})

it("should get a ride", async () => {
	const { ride_id: rideId, passenger_id: passengerId } = await database.addFakeRide()
	const getRide = new GetRide(rideDao)
	const input = new GetRideInput(rideId)
	const output = await getRide.execute(input)

	expect(output).toBeTruthy()
	expect(output!.ride).toHaveProperty("rideId")
	expect(output!.ride.passengerId).toEqual(passengerId)
})
