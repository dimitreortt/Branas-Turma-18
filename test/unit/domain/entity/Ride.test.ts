import { Ride } from "../../../../src/domain/entities/Ride"
import { randomUUID } from "../../util/random"

it("should create a ride", () => {
	const now = new Date()
	const rideId = randomUUID()
	const passengerId = randomUUID()
	const fromLat = -27.584905257808835
	const fromLong = -48.545022195325124
	const toLat = -27.496887588317275
	const toLong = -48.522234807851476

	const ride = new Ride(rideId, passengerId, fromLat, fromLong, toLat, toLong)

	expect(ride.getRideId()).toBe(rideId)
	expect(ride.getPassengerId()).toBe(passengerId)
	expect(ride.getRequestedAt().getMinutes()).toBe(now.getMinutes())
	expect(ride.getFrom().getLat()).toBe(fromLat)
	expect(ride.getFrom().getLong()).toBe(fromLong)
	expect(ride.getTo().getLat()).toBe(toLat)
	expect(ride.getTo().getLong()).toBe(toLong)
	expect(ride.getStatus()).toEqual("requested")
})

it("should not finish a ride that", async () => {
   
})