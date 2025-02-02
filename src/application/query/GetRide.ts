import { RideDAOI } from "../../domain/dao/RideDAOI";
import { GetRideInput } from "../dto/GetRideInput";
import { GetRideOutput } from "../dto/GetRideOutput";

export class GetRide {
    constructor(private rideDao: RideDAOI) { }

    async execute(input: GetRideInput): Promise<GetRideOutput | null> {
        const ride = await this.rideDao.getRide(input.rideId)
        if (!ride) {
            return null
        }
        return new GetRideOutput(ride)
    }
}
