import { Position } from "../../../../src/domain/entities/Position"
import { Ride } from "../../../../src/domain/entities/Ride"
import { RideRepository, RideRepositoryI } from "../../../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../../../mocks/DatabaseMock"
import { randomUUID } from "../../util/random"

let database: DatabaseMock
let rideRepo: RideRepositoryI

beforeAll(async () => {
    database = await new DatabaseMock().build()
    rideRepo = new RideRepository(database)
})

const fromLat = -27.584905257808835
const fromLong = -48.545022195325124
const toLat = -27.496887588317275
const toLong = -48.522234807851476

it("should save a ride", async () => {
    const passengerId = randomUUID()
    const rideId = randomUUID()
    const ride = new Ride(rideId, passengerId, fromLat, fromLong, toLat, toLong)

    await rideRepo.save(ride)

    const result = await database.query("select * from online_taxi.ride where passenger_id = $1", [passengerId])
    expect(result.length).toEqual(1)
    expect(result[0].ride_id).toBe(rideId)
	expect(result[0].passenger_id).toBe(passengerId)
	expect(new Date(result[0].requested_at).getMinutes()).toBe(new Date().getMinutes())
	expect(result[0].from_lat).toBe(fromLat)
	expect(result[0].from_long).toBe(fromLong)
	expect(result[0].to_lat).toBe(toLat)
	expect(result[0].to_long).toBe(toLong)
	expect(result[0].status).toEqual("requested")

})

it("should update a ride", async () => {
    const { ride_id: rideId, driver_id: oldDriverId, passenger_id } = await database.addFakeRide()
    expect(oldDriverId).toBeFalsy()

    const newDriverId = randomUUID()
    const ride = new Ride(rideId, passenger_id, fromLat, fromLong, toLat, toLong, newDriverId, "accepted")
    await rideRepo.update(ride)

    const result = await database.query("select * from online_taxi.ride where ride_id = $1", [rideId])
    expect(result.length).toEqual(1)
    expect(result[0].ride_id).toBe(rideId)
    expect(result[0].status).toBe("accepted")
    expect(result[0].driver_id).toBe(newDriverId)
})

it("should update the status of a ride", async () => {
    const { ride_id, passenger_id, driver_id } = await database.addFakeRide()
    const ride = new Ride(ride_id, passenger_id, fromLat, fromLong, toLat, toLong, driver_id, "in_progress")
    
    await rideRepo.updateStatus(ride)

    const result = await database.query("select status from online_taxi.ride where ride_id = $1", [ride_id])
    expect(result.length).toEqual(1)
    expect(result[0].status).toBe("in_progress")
})

it("should save the position of a ride", async () => {
    const { ride_id } = await database.addFakeRide()
    const position = Position.create(ride_id, fromLat, fromLong, new Date())
    await rideRepo.savePosition(position)
    const result = await database.query("select * from online_taxi.position where ride_id = $1", [ride_id])
    expect(result.length).toEqual(1)
    expect(result[0].ride_id).toBe(ride_id)
    expect(result[0].lat).toBe(fromLat)
    expect(result[0].long).toBe(fromLong)
})