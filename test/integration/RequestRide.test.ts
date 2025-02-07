import { RequestRideInput } from "../../src/application/dto/RequestRideInput"
import { RequestRide } from "../../src/application/usecase/RequestRide"
import { RideDAOI } from "../../src/domain/dao/RideDAOI"
import { UserDAOI } from "../../src/domain/dao/UserDAOI"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { UserDAO } from "../../src/infra/dao/UserDAO"
import { Registry } from "../../src/infra/di/Registry"
import { RideRepository, RideRepositoryI } from "../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomEmail, randomInt } from "../unit/util/random"

let database: DatabaseMock
let rideDao: RideDAOI
let rideRepository: RideRepositoryI
let userDao: UserDAOI

beforeAll(async () => {
	database = await new DatabaseMock().build()
	rideDao = new RideDAO()
	rideRepository = new RideRepository()
	userDao = new UserDAO()
    Registry.getInstance().provide('database', database)
    Registry.getInstance().provide('rideDao', rideDao)
    Registry.getInstance().provide('rideRepository', rideRepository)
    Registry.getInstance().provide('userDao', userDao)
})

const fromLat = -27.584905257808835
const fromLong = -48.545022195325124
const toLat = -27.496887588317275
const toLong = -48.522234807851476

it("should request (create) a ride", async () => {
	const { user_id: passengerId } = await database.addDummyUser1(randomEmail(), 1)
	const input = new RequestRideInput(passengerId, fromLat, fromLong, toLat, toLong)
	const requestRide = new RequestRide()
	const output = await requestRide.execute(input)
	expect(output.rideId).toBeTruthy()
})

it("should not create a ride if passenger has open ride", async () => {
	const { user_id: passengerId } = await database.addDummyUser1(randomEmail(), 1)
	await database.addFakeRide({ passengerId })
	const input = new RequestRideInput(passengerId, fromLat, fromLong, toLat, toLong)
	const requestRide = new RequestRide()
	await expect(requestRide.execute(input)).rejects.toThrow("Passenger has open ride")
})

it("should not create a ride if user id is not from a passenger user", async () => {
	const { user_id: driverId } = await database.addDummyUser1(randomEmail(), 2)
	const input = new RequestRideInput(driverId, fromLat, fromLong, toLat, toLong)
	const requestRide = new RequestRide()
	await expect(requestRide.execute(input)).rejects.toThrow("Id provided is not from a passenger user")
})
