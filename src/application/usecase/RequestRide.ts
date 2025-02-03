import { RideDAOI } from "../../domain/dao/RideDAOI"
import { UserDAOI } from "../../domain/dao/UserDAOI"
import { Ride } from "../../domain/entities/Ride"
import { RideRepositoryI } from "../../infra/repository/RideRepository"
import { RequestRideInput } from "../dto/RequestRideInput"
import { RequestRideOutput } from "../dto/RequestRideOutput"

export class RequestRide {
	constructor(private rideDAO: RideDAOI, private rideRepository: RideRepositoryI, private userDao: UserDAOI) {}

	async execute(input: RequestRideInput): Promise<RequestRideOutput> {
		const user = await this.userDao.getUserById(input.passengerId)
		if (!user || user.userType !== 1) {
			throw new Error("Id provided is not from a passenger user")
		}
		const hasOpenRide = await this.rideDAO.checkOpenRides(input.passengerId)
		if (hasOpenRide) {
			throw new Error("Passenger has open ride")
		}
		const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong)
		const rideId = await this.rideRepository.save(ride)
		return new RequestRideOutput(rideId)
	}
}
