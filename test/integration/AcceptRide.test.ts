import { AcceptRide } from "../../src/application/usecase/AcceptRide"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { Registry } from "../../src/infra/di/Registry"
import { RideRepository } from "../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomUUID } from "../unit/util/random"

let database: DatabaseMock

beforeAll(async () => {
	database = await new DatabaseMock().build()
	const rideDao = new RideDAO(database)
	const rideRepository = new RideRepository(database)
	Registry.getInstance().provide("rideDao", rideDao)
	Registry.getInstance().provide("rideRepository", rideRepository)
})

it("should accept a ride", async () => {
	const acceptRide = new AcceptRide()
	const { ride_id: rideId } = await database.addFakeRide()
	const input = {
		rideId: rideId,
		driverId: randomUUID(),
	}
	await acceptRide.execute(input)

	const result = await database.query("select * from online_taxi.ride where ride_id = $1", [rideId])
	expect(result[0].status).toBe("accepted")
	expect(result[0].driver_id).toBe(input.driverId)
})
