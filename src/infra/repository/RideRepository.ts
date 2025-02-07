import { Position } from "../../domain/vo/Position"
import { Ride } from "../../domain/entities/Ride"
import { DatabaseI } from "../database/Database"
import { inject } from "../di/Registry"

export interface RideRepositoryI {
	save(ride: Ride): Promise<string>
	update(ride: Ride): Promise<void>
	updateStatus(ride: Ride): Promise<void>
    savePosition(position: Position): Promise<void>
}

export class RideRepository implements RideRepositoryI {
    @inject('database')
    private database?: DatabaseI

	constructor() {}

	async save(ride: Ride): Promise<string> {
		const result = await this.database?.query("insert into online_taxi.ride (ride_id, passenger_id, status, requested_at, from_lat, from_long, to_lat, to_long) values ($1, $2, $3, $4, $5, $6, $7, $8) returning ride_id", [ride.getRideId(), ride.getPassengerId(), ride.getStatus(), ride.getRequestedAt(), ride.getFrom().getLat(), ride.getFrom().getLong(), ride.getTo().getLat(), ride.getTo().getLong()])
		return result && result[0].ride_id
	}

	async update(ride: Ride): Promise<void> {
		const query = "UPDATE online_taxi.ride SET status = $1, driver_id = $2 where ride_id = $3"
		const params = [ride.getStatus(), ride.getDriverId(), ride.getRideId()];
        await this.database?.query(query, params)
	}

    async updateStatus(ride: Ride): Promise<void> {
        await this.database?.query("update online_taxi.ride SET status = $1 where ride_id = $2", [ride.getStatus(), ride.getRideId()])
    }

    async savePosition(position: Position): Promise<void> {
        await this.database?.query("insert into online_taxi.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5);", [position.getPositionId(), position.getRideId(), position.getCoords().getLat(), position.getCoords().getLong(), position.getDate()])
    }
}
