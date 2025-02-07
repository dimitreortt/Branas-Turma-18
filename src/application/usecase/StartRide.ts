import { RideDAOI } from "../../domain/dao/RideDAOI"
import { inject } from "../../infra/di/Registry"
import { RideRepositoryI } from "../../infra/repository/RideRepository"

export class StartRide {
    @inject('rideDao')
    rideDao?: RideDAOI
    @inject('rideRepository')
    rideRepository?: RideRepositoryI

    constructor() { }

    async execute(input: StartRideInput) {
        const ride = await this.rideDao?.getRide(input.rideId)
        if (!ride) { 
            throw new Error('Ride not found')
        }
        ride.start()
        await this.rideRepository?.updateStatus(ride)
    }
}

type StartRideInput = {
    rideId: string
}