import { RideDAOI } from "../../domain/dao/RideDAOI";
import { Coords } from "../../domain/vo/Coords";
import { inject } from "../../infra/di/Registry";

export class GetRide {
    @inject('rideDao')
    private rideDao?: RideDAOI

    constructor() { }

    async execute(input: GetRideInput): Promise<GetRideOutput> {
        const ride = await this.rideDao?.getRide(input.rideId)
        if (!ride) throw new Error('Ride not found')
        return {
            rideId: ride.getRideId(),
            passengerId: ride.getPassengerId(),
            driverId: ride.getDriverId(),
            requestedAt: ride.getRequestedAt(),
            status: ride.getStatus(),
            to: ride.getTo(),
            from: ride.getFrom(),
        }
    }
}

type GetRideInput = {
    rideId: string
}

type GetRideOutput = {
    rideId: string
    passengerId: string
    driverId?: string
    requestedAt: Date
    status: string
    from: Coords
    to: Coords
}