import { UpdatePosition } from "../../src/application/usecase/UpdatePosition"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { Registry } from "../../src/infra/di/Registry"
import { RideRepository } from "../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"

let database: DatabaseMock

beforeAll(async () => {
    database = await new DatabaseMock().build()
    Registry.getInstance().provide('database', database)
    Registry.getInstance().provide('rideDao', new RideDAO())
    Registry.getInstance().provide('rideRepository', new RideRepository())
})

const lat1 = -27.584905257808835
const long1 = -48.545022195325124
const lat2 = -27.496887588317275
const long2 = -48.522234807851476

it("should update the ride position", async () => {
    const { ride_id } = await database.addFakeRide({ status: 'in_progress' })
    const updatePosition = new UpdatePosition()
    await updatePosition.execute({ rideId: ride_id, lat: lat1, long: long1 })

    let result
    result = await database.query('select * from online_taxi.position where ride_id = $1', [ride_id])
    expect(result.length).toBe(1)
    expect(result[0].lat).toBe(lat1)
    expect(result[0].long).toBe(long1)

    await updatePosition.execute({ rideId: ride_id, lat: lat2, long: long2 })
    result = await database.query('select * from online_taxi.position where ride_id = $1', [ride_id])
    expect(result.length).toBe(2)
    expect(result[1].lat).toBe(lat2)
    expect(result[1].long).toBe(long2)
})

it("should not update the ride position if the ride is not in progress", async () => {
    const updatePosition = new UpdatePosition()

    for (const status in ['requested', 'accepted']) {
        const { ride_id } = await database.addFakeRide({ status })
        await expect(updatePosition.execute({ rideId: ride_id, lat: lat1, long: long1 })).rejects.toThrow("Ride is not in progress")
    }
})