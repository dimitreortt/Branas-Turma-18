import { RideDAOI } from "../../domain/dao/RideDAOI";
import { RideCompletedEvent } from "../../domain/event/RideCompletedEvent";
import { FareCalculator } from "../../domain/service/FareCalculator";
import { inject } from "../../infra/di/Registry";
import { Mediator } from "../../infra/mediator/Mediator";
import { PositionsRepositoryI } from "../../infra/repository/PositionsRepository";
import { RideRepositoryI } from "../../infra/repository/RideRepository";

export class FinishRide {
    @inject('rideDao')
    rideDao!: RideDAOI
    @inject('rideRepository')
    rideRepository!: RideRepositoryI
    @inject('positionsRepository')
    positionsRepository!: PositionsRepositoryI
    @inject('mediator')
    mediator!: Mediator

    constructor() { }

    async execute(input: FinishRideInput): Promise<void> {
        const ride = await this.rideDao.getRide(input.rideId)
        if (!ride) throw new Error('Ride not found')
        ride.register(RideCompletedEvent.eventName, async (event: any) => {
            await this.rideRepository?.update(ride)
            this.mediator.notify(RideCompletedEvent.eventName, event)
        })
        const positions = await this.positionsRepository!.getPositionsByRideId(input.rideId)
        ride.complete(positions)
    }
}

type FinishRideInput = {
    rideId: string
}
