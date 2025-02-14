import { RideDAOI } from "../../domain/dao/RideDAOI";
import { FareCalculator } from "../../domain/service/FareCalculator";
import { inject } from "../../infra/di/Registry";
import { PositionsRepositoryI } from "../../infra/repository/PositionsRepository";
import { RideRepositoryI } from "../../infra/repository/RideRepository";

export class FinishRide {
    @inject('rideDao')
    rideDao?: RideDAOI
    @inject('rideRepository')
    rideRepository?: RideRepositoryI
    @inject('positionsRepository')
    positionsRepository?: PositionsRepositoryI

    constructor() { }

    async execute(input: FinishRideInput): Promise<void> {
        const ride = await this.rideDao?.getRide(input.rideId)
        if (!ride) throw new Error('Ride not found')
        const positions = await this.positionsRepository?.getPositionsByRideId(input.rideId)
        if (!positions || !positions.length) throw new Error('No positions found for this ride')
        ride.complete(positions)
        await this.rideRepository?.update(ride)
    }
}

type FinishRideInput = {
    rideId: string
}
