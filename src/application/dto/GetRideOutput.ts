import { RideDTO } from "../../domain/dto/RideDTO";

export class GetRideOutput {
    constructor(readonly ride: RideDTO) { }
}
