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
    const ride = new Ride(passengerId)

    rideRepo.save(ride)

    const result = await database.query('select * from online_taxi.ride where passenger_id = $1', [passengerId])
    expect(result.length).toEqual(1)
})