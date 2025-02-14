export interface FareCalculator {
	calculate(distance: number): number
}

class NormalFareCalculator implements FareCalculator {
	calculate(distance: number): number {
		return distance * 2.1
	}
}

class OvernightFareCalculator implements FareCalculator {
	calculate(distance: number): number {
		return distance * 3.9
	}
}

class SpecialDayFareCalculator implements FareCalculator {
	calculate(distance: number): number {
		return distance * 1
	}
}

export class FareCalculatorFactory {
	static create(date: Date) {
		if (date.getDate() === 1) return new SpecialDayFareCalculator()
		if (date.getHours() > 22 || date.getHours() < 6) return new OvernightFareCalculator()
		return new NormalFareCalculator()
	}
}
