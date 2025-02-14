export class RideCompletedEvent {
	static eventName: "rideCompleted"

	constructor(readonly rideId: string, readonly fare: number) {}
}
