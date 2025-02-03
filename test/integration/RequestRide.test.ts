import { RequestRideInput } from "../../src/application/dto/RequestRideInput"
import { RequestRide } from "../../src/application/usecase/RequestRide"
import { RideDAOI } from "../../src/domain/dao/RideDAOI"
import { UserDAOI } from "../../src/domain/dao/UserDAOI"
import { RideDAO } from "../../src/infra/dao/RideDAO"
import { UserDAO } from "../../src/infra/dao/UserDAO"
import { RideRepository, RideRepositoryI } from "../../src/infra/repository/RideRepository"
import { DatabaseMock } from "../mocks/DatabaseMock"
import { randomEmail, randomInt } from "../unit/util/random"

let database: DatabaseMock
let rideDao: RideDAOI
let rideRepository: RideRepositoryI
let userDao: UserDAOI

beforeAll(async () => {
   database = await new DatabaseMock().build()
   rideDao = new RideDAO(database)
   rideRepository = new RideRepository(database)
   userDao = new UserDAO(database)
})

it("should request (create) a ride", async () => {
    const { user_id: passengerId } = await database.addDummyUser1(randomEmail(), 1)
    const input = new RequestRideInput(passengerId)
    const requestRide = new RequestRide(rideDao, rideRepository, userDao)
    const output = await requestRide.execute(input)
    expect(output.rideId).toBeTruthy()
})

it("should not create a ride if passenger has open ride", async () => {
    const { user_id: passengerId } = await database.addDummyUser1(randomEmail(), 1)
    await database.addDummyRide1(passengerId)
    const input = new RequestRideInput(passengerId)
    const requestRide = new RequestRide(rideDao, rideRepository, userDao)
    await expect(requestRide.execute(input)).rejects.toThrow('Passenger has open ride')
})

it("should not create a ride if user id is not from a passenger user", async () => {
    const { user_id: driverId } = await database.addDummyUser1(randomEmail(), 2)
    const input = new RequestRideInput(driverId)
    const requestRide = new RequestRide(rideDao, rideRepository, userDao)
    await expect(requestRide.execute(input)).rejects.toThrow('Id provided is not from a passenger user')
})