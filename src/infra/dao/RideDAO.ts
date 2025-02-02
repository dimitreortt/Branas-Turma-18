import { RideDAOI } from "../../domain/dao/RideDAOI";
import { RideDTO } from "../../domain/dto/RideDTO";
import { DatabaseI } from "../database/Database";
import { RideDTOFactory } from "../service/RideDTOFactory";

export class RideDAO implements RideDAOI {
    constructor(private database: DatabaseI) {}

    async checkOpenRides(passengerId: string): Promise<boolean> {
        const result = await this.database.query('select ride_id from online_taxi.ride where passenger_id = $1', [passengerId])
        if (result.length) {
            return true
        }
        return false
    }

    async getRide(rideId: string): Promise<RideDTO | null> {
        const result = await this.database.query("select * from online_taxi.ride where ride_id = $1", [rideId])
        if (!result.length) {
            return null
        }
        return RideDTOFactory.fromDbResult(result)
    }
}
