import { StartRide } from "../../src/application/usecase/StartRide"
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

it("should start a ride", async () => {
    const { ride_id } = await database.addFakeRide({ status: "accepted"})
    const startRide = new StartRide()
    
    await startRide.execute({ rideId: ride_id })
    
    const [ride] = await database.query("select status from online_taxi.ride where ride_id = $1", [ride_id])
    expect(ride.status).toBe("in_progress")
})

it("should not start a ride if it's not in accepted status", async () => {
    const startRide = new StartRide()

    for (const status of ['requested', 'in_progress']) {
        const result = await database.addFakeRide({ status })
        const { ride_id } = result
        await expect(startRide.execute({ rideId: ride_id })).rejects.toThrow('Ride is not in accepted state')
    }
})