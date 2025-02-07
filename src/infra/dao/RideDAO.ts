import { RideDAOI } from "../../domain/dao/RideDAOI"
import { Ride } from "../../domain/entities/Ride"
import { DatabaseI } from "../database/Database"
import { inject } from "../di/Registry"

export class RideDAO implements RideDAOI {
    @inject('database')
    private database?: DatabaseI

	constructor() {}

	async checkOpenRides(passengerId: string): Promise<boolean> {
		const result = await this.database?.query("select ride_id from online_taxi.ride where passenger_id = $1", [passengerId])
		if (result?.length) {
			return true
		}
		return false
	}

	async getRide(rideId: string): Promise<Ride> {
		const result = await this.database?.query("select * from online_taxi.ride where ride_id = $1", [rideId])
		if (!result?.length) {
			throw new Error("Ride does not exist")
		}
		const [{ ride_id, passenger_id, driver_id, status, from_lat, from_long, to_lat, to_long }] = result
		return new Ride(ride_id, passenger_id, from_lat, from_long, to_lat, to_long, driver_id, status)
	}
}
