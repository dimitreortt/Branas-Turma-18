import { FinishRide } from "../../src/application/usecase/FinishRide"
import { RideDAOI } from "../../src/domain/dao/RideDAOI"
import { Position } from "../../src/domain/vo/Position"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { Registry } from "../../src/infra/di/Registry"
import { Mediator } from "../../src/infra/mediator/Mediator"
import { PositionsRepository } from "../../src/infra/repository/PositionsRepository"
import { RideRepository, RideRepositoryI } from "../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomUUID } from "../unit/util/random"

let database: DatabaseMock
let rideDao: RideDAOI
let rideRepository: RideRepositoryI

beforeAll(async () => {
    database = await new DatabaseMock().build()
    rideDao = new RideDAO()
    rideRepository = new RideRepository()
    const mediator = new Mediator()
    mediator.register('finishRide', () => {
        console.log('generateInvoice')
        console.log('')
    })
    Registry.getInstance().provide('database', database)
    Registry.getInstance().provide('rideDao', rideDao)
    Registry.getInstance().provide('rideRepository', rideRepository)
    Registry.getInstance().provide('positionsRepository', new PositionsRepository())
})

it("should finish a ride that has status in progress", async () => {
    const result = await database.addFakeRide({ status: 'in_progress' })
    await rideRepository.savePosition(new Position(randomUUID(), result.ride_id, 0, 0, new Date()))
    await rideRepository.savePosition(new Position(randomUUID(), result.ride_id, 1, 1, new Date()))
    await rideRepository.savePosition(new Position(randomUUID(), result.ride_id, 2, 2, new Date()))

    const finishRide = new FinishRide()
    const input = {
        rideId: result.ride_id
    }
    await finishRide.execute(input)

    const ride = await rideDao.getRide(input.rideId)
    expect(ride.getStatus()).toBe('completed')
    expect(ride.getFare()).toBe(659.4)
    expect(ride.getDistance()).toBe(314)
})

it("should not finish a ride that does not have status in progress", async () => {
    const finishRide = new FinishRide()
    
    for (const status of ['completed', 'requested', 'accepted']) {
        const result = await database.addFakeRide({ status })
        await rideRepository.savePosition(new Position(randomUUID(), result.ride_id, 0, 0, new Date()))
        const input = {
            rideId: result.ride_id
        }
        await expect(finishRide.execute(input)).rejects.toThrow(new Error('Ride is not in progress'))
    }
})