export class RideDTO {
    constructor(readonly rideId: string, readonly passengerId: string, readonly driverId: string, readonly requestedAt: Date, readonly status: string) { }
}
