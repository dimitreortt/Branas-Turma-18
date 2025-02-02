import { RideDTO } from "../../domain/dto/RideDTO";

export class RideDTOFactory {
    constructor() { }

    static fromDbResult(result: any[]) {
        const { ride_id, passenger_id, driver_id, requested_at, status } = result[0]
        return new RideDTO(ride_id, passenger_id, driver_id, requested_at, status);
    }
}
