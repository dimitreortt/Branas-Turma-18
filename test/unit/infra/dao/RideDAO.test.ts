import { RideDAO } from "../../../../src/infra/dao/RideDAO"
import { Registry } from "../../../../src/infra/di/Registry"
import { DatabaseMock } from "../../../mocks/DatabaseMock"
import { randomInt, randomUUID } from "../../util/random"

let database: DatabaseMock
let rideDao: RideDAO

beforeAll(async () => {
	database = await new DatabaseMock().build()
    Registry.getInstance().provide('database', database)
	rideDao = new RideDAO()
})

it("should get a ride", async () => {
	const { ride_id: rideId } = await database.addFakeRide()
	const ride = await rideDao.getRide(rideId)
	expect(ride).toHaveProperty("rideId")
})

it("should not get a ride that does not exist", async () => {
	await expect(rideDao.getRide(randomUUID())).rejects.toThrow('Ride does not exist')
})

it("should check that a passenger does not have open rides", async () => {
	const result = await rideDao.checkOpenRides(randomUUID())
	expect(result).toBeFalsy()
})

it("should check that a passenger have open rides", async () => {
	const passengerId = randomUUID()
	await database.addFakeRide({ passengerId })
	const rideDao = new RideDAO()
	const result = await rideDao.checkOpenRides(passengerId)
	expect(result).toBeTruthy()
})
