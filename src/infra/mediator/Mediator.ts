export class Mediator {
	handlers: { eventName: string; callback: Function }[] = []

	constructor() {}

	register(eventName: string, callback: Function) {
		this.handlers.push({
			eventName,
			callback,
		})
	}

	async notify(eventName: string, data: any) {
		for (const handler of this.handlers) {
			if (handler.eventName === eventName) {
				await handler.callback(data)
			}
		}
	}
}
