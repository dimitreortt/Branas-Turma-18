import { Ride } from "../../../../src/domain/entities/Ride"
import { randomUUID } from "../../util/random"

it("should create a ride", () => {
    const now = new Date()
    const passengerId = randomUUID()
    const ride = new Ride(passengerId)

    expect(ride.getRequestedAt().getMinutes()).toEqual(now.getMinutes())
    expect(ride.passengerId).toEqual(passengerId)
    expect(ride.getStatus()).toEqual('requested')
})