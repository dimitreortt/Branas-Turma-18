export interface RideStatus {
	value: string
	start(): RideStatus
	accept(): RideStatus
	complete(): RideStatus
}

export class RequestedStatus implements RideStatus {
	value: string = "requested"

	start(): RideStatus {
		throw new Error("Ride is not in accepted state")
	}

	accept(): RideStatus {
		return new AcceptedStatus()
	}

	complete(): RideStatus {
		throw new Error("Ride is not in progress")
	}
}

export class AcceptedStatus implements RideStatus {
	value: string = "accepted"

	start(): RideStatus {
		return new StartedStatus()
	}

	accept(): RideStatus {
		throw new Error("Method not implemented.")
	}

	complete(): RideStatus {
		throw new Error("Ride is not in progress")
	}
}

export class StartedStatus implements RideStatus {
	value: string = "in_progress"

	start(): RideStatus {
		throw new Error("Ride is not in accepted state")
	}

	accept(): RideStatus {
		throw new Error("Method not implemented.")
	}

	complete(): RideStatus {
		return new CompletedStatus()
	}
}

export class CompletedStatus implements RideStatus {
	value: string = "completed"

	start(): RideStatus {
		throw new Error("Method not implemented.")
	}

	accept(): RideStatus {
		throw new Error("Method not implemented.")
	}

	complete(): RideStatus {
		throw new Error("Ride is not in progress")
	}
}

export class RideStatusFactory {
	static create(status: string) {
		if (status === "requested") return new RequestedStatus()
		if (status === "accepted") return new AcceptedStatus()
		if (status === "in_progress") return new StartedStatus()
		if (status === "completed") return new CompletedStatus()
		throw new Error("Invalid status")
	}
}
