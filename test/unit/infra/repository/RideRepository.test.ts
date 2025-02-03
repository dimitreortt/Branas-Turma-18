import { Ride } from "../../../../src/domain/entities/Ride"
import { RideRepository } from "../../../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../../../mocks/DatabaseMock"
import { randomUUID } from "../../util/random"

let database: DatabaseMock

beforeAll(async () => {
    database = await new DatabaseMock().build()
})

it("should save a ride", async () => {
    const rideRepo = new RideRepository(database)
    const passengerId = randomUUID()
    const fromLat = -27.584905257808835
    const fromLong = -48.545022195325124
    const toLat = -27.496887588317275
    const toLong = -48.522234807851476

    const ride = new Ride(passengerId, fromLat, fromLong, toLat, toLong)

    rideRepo.save(ride)

    const result = await database.query("select * from online_taxi.ride where passenger_id = $1", [passengerId])
    expect(result.length).toEqual(1)
})
