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
        ride.accept(input.driverId)
		await this.rideRepository?.update(ride)
	}
}

export type RequestRideInput = {
	rideId: string
	driverId: string
}
