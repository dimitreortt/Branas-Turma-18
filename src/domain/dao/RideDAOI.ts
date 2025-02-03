import { RideDTO } from "../dto/RideDTO"
import { Ride } from "../entities/Ride"

export interface RideDAOI {
	checkOpenRides(passengerId: string): Promise<boolean>
	getRide(rideId: string): Promise<Ride>
}
