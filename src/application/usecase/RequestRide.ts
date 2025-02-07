import { RideDAOI } from "../../domain/dao/RideDAOI"
import { UserDAOI } from "../../domain/dao/UserDAOI"
import { Ride } from "../../domain/entities/Ride"
import { inject } from "../../infra/di/Registry"
import { RideRepositoryI } from "../../infra/repository/RideRepository"
import { RequestRideInput } from "../dto/RequestRideInput"

export class RequestRide {
    @inject('rideDao')
    private rideDao?: RideDAOI
    @inject('userDao')
    private userDao?: UserDAOI
    @inject('rideRepository')
    private rideRepository?: RideRepositoryI

	constructor() {}

	async execute(input: RequestRideInput): Promise<RequestRideOutput> {
		const user = await this.userDao?.getUserById(input.passengerId)
		if (!user || user.userType !== 1) {
			throw new Error("Id provided is not from a passenger user")
		}
		const hasOpenRide = await this.rideDao?.checkOpenRides(input.passengerId)
		if (hasOpenRide) {
			throw new Error("Passenger has open ride")
		}
		const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong)
		await this.rideRepository?.save(ride)
        return { rideId: ride.getRideId() }
	}
}

type RequestRideOutput = {
    rideId: string
}