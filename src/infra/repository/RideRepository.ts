import { Position } from "../../domain/entities/Position"
import { Ride } from "../../domain/entities/Ride"
import { DatabaseI } from "../database/Database"

export interface RideRepositoryI {
	save(ride: Ride): Promise<string>
	update(ride: Ride): Promise<string>
	updateStatus(ride: Ride): Promise<void>
    savePosition(position: Position): Promise<void>
}

export class RideRepository implements RideRepositoryI {
	constructor(private database: DatabaseI) {}

	async save(ride: Ride): Promise<string> {
		const [{ ride_id }] = await this.database.query("insert into online_taxi.ride (ride_id, passenger_id, status, requested_at, from_lat, from_long, to_lat, to_long) values ($1, $2, $3, $4, $5, $6, $7, $8) returning ride_id", [ride.getRideId(), ride.getPassengerId(), ride.getStatus(), ride.getRequestedAt(), ride.getFrom().getLat(), ride.getFrom().getLong(), ride.getTo().getLat(), ride.getTo().getLong()])
		return ride_id
	}

	async update(ride: Ride): Promise<string> {
		const query = "UPDATE online_taxi.ride SET passenger_id = $1, driver_id = $2, status = $3, requested_at = $4, from_lat = $5, from_long = $6, to_lat = $7, to_long = $8 WHERE ride_id = $9 RETURNING ride_id;"
		const params = [ride.getPassengerId(), ride.getDriverId(), ride.getStatus(), ride.getRequestedAt(), ride.getFrom().getLat(), ride.getFrom().getLong(), ride.getTo().getLat(), ride.getTo().getLong(), ride.getRideId()]

        const [{ ride_id }] = await this.database.query(query, params)
		return ride_id
	}

    async updateStatus(ride: Ride): Promise<void> {
        await this.database.query("update online_taxi.ride SET status = $1 where ride_id = $2", [ride.getStatus(), ride.getRideId()])
    }

    async savePosition(position: Position): Promise<void> {
        await this.database.query("insert into online_taxi.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5);", [position.getPositionId(), position.getRideId(), position.getCoords().getLat(), position.getCoords().getLong(), position.getDate()])
    }
}
