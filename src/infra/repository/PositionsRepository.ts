import { DatabaseI } from "../database/Database";
import { User } from "../../domain/entities/User";
import { inject } from "../di/Registry";
import { Position } from "../../domain/vo/Position";

export interface PositionsRepositoryI {
    getPositionsByRideId(rideId: string): Promise<Position[]>
}

export class PositionsRepository implements PositionsRepositoryI {
    @inject('database')
    private database?: DatabaseI

    async getPositionsByRideId(rideId: string): Promise<Position[]> {
        const results = await this.database?.query('select * from online_taxi.position where ride_id = $1', [rideId])
        if (!results) return []
        return results.map((row) => {
            return new Position(row.position_id, row.ride_id, row.lat, row.long, row.date)
        })
    }
}
