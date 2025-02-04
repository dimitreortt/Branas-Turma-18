import { Ride } from "../../domain/entities/Ride"
import { DatabaseI } from "../database/Database"

export interface RideRepositoryI {
	save(ride: Ride): Promise<number>
	update(ride: Ride): Promise<number>
}

export class RideRepository implements RideRepositoryI {
	constructor(private database: DatabaseI) {}

	async save(ride: Ride): Promise<number> {
		const [{ ride_id }] = await this.database.query("insert into online_taxi.ride (ride_id, passenger_id, status, requested_at) values ($1, $2, $3, $4) returning ride_id", [ride.getRideId(), ride.getPassengerId(), ride.getStatus(), ride.getRequestedAt()])
		return ride_id
	}

	async update(ride: Ride): Promise<number> {
		const query = "UPDATE online_taxi.ride SET passenger_id = $1, driver_id = $2, status = $3, requested_at = $4, from_lat = $5, from_long = $6, to_lat = $7, to_long = $8 WHERE ride_id = $9 RETURNING ride_id;"
		const params = [ride.getPassengerId(), ride.getDriverId(), ride.getStatus(), ride.getRequestedAt(), ride.getFrom().getLat(), ride.getFrom().getLong(), ride.getTo().getLat(), ride.getTo().getLong(), ride.getRideId()]

		const [{ ride_id }] = await this.database.query(query, params)

		return ride_id
	}
}
