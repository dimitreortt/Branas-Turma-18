import { RideDAOI } from "../../domain/dao/RideDAOI"
import { Position } from "../../domain/entities/Position"
import { inject } from "../../infra/di/Registry"
import { RideRepositoryI } from "../../infra/repository/RideRepository"

export class UpdatePosition {
    @inject('rideDao')
    rideDao?: RideDAOI
    @inject('rideRepository')
    rideRepository?: RideRepositoryI

    constructor() { }

    async execute(input: UpdatePositionInput): Promise<void> {
        const ride = await this.rideDao?.getRide(input.rideId)
        if (!ride) {
            throw new Error("Ride not found")
        }
        if (ride.getStatus() !== 'in_progress') {
            throw new Error("Ride is not in progress")
        }
        const position = Position.create(input.rideId, input.lat, input.long, new Date())
        await this.rideRepository?.savePosition(position)
    }
}

type UpdatePositionInput = {
    rideId: string
    lat: number
    long: number
}
