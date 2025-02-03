import { RideDAOI } from "../../domain/dao/RideDAOI"
import { inject } from "../../infra/di/Registry"
import { RideRepositoryI } from "../../infra/repository/RideRepository"

export class AcceptRide {
	@inject("rideRepository")
	rideRepository?: RideRepositoryI
	@inject("rideDao")
	rideDao?: RideDAOI

	constructor() {}

	async execute(input: RequestRideInput): Promise<void> {
		const ride = await this.rideDao?.getRide(input.rideId)
		if (!ride) {
			throw new Error("Ride does not exist")
		}
		ride.setStatus("accepeted")
		ride.setDriverId(input.driverId)
		await this.rideRepository?.save(ride)
	}
}

export type RequestRideInput = {
	rideId: string
	driverId: string
}
