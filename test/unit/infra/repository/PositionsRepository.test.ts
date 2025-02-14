import { Position } from "../../../../src/domain/vo/Position"
import { Ride } from "../../../../src/domain/entities/Ride"
import { RideRepository, RideRepositoryI } from "../../../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../../../mocks/DatabaseMock"
import { randomUUID } from "../../util/random"
import { Registry } from "../../../../src/infra/di/Registry"
import { PositionsRepository, PositionsRepositoryI } from "../../../../src/infra/repository/PositionsRepository"

let database: DatabaseMock
let rideRepo: RideRepositoryI
let positionsRepo: PositionsRepositoryI

beforeAll(async () => {
    database = await new DatabaseMock().build()
    Registry.getInstance().provide('database', database)
    rideRepo = new RideRepository()
    positionsRepo = new PositionsRepository()
})

it("should get the positions of a ride by id", async () => {
    const result = await database.addFakeRide({ status: 'in_progress' })
    await rideRepo.savePosition(new Position(randomUUID(), result.ride_id, 0, 0, new Date()))
    await rideRepo.savePosition(new Position(randomUUID(), result.ride_id, 1, 1, new Date()))
    await rideRepo.savePosition(new Position(randomUUID(), result.ride_id, 2, 2, new Date()))

    const positions = await positionsRepo.getPositionsByRideId(result.ride_id)
    expect(positions.length).toBe(3)
    expect(positions[0].getCoords().getLat()).toBe(0)
    expect(positions[0].getCoords().getLong()).toBe(0)
    expect(positions[1].getCoords().getLat()).toBe(1)
    expect(positions[1].getCoords().getLong()).toBe(1)
    expect(positions[2].getCoords().getLat()).toBe(2)
    expect(positions[2].getCoords().getLong()).toBe(2)
})