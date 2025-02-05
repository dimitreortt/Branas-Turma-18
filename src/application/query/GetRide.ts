import { RideDAOI } from "../../domain/dao/RideDAOI";
import { Coords } from "../../domain/entities/Coords";

export class GetRide {
    constructor(private rideDao: RideDAOI) { }

    async execute(input: GetRideInput): Promise<GetRideOutput> {
        const ride = await this.rideDao.getRide(input.rideId)
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