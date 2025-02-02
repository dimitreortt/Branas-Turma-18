import { RideDTO } from "../dto/RideDTO";

export interface RideDAOI {
    checkOpenRides(passengerId: string): Promise<boolean>
    getRide(rideId: string): Promise<RideDTO | null>
}
