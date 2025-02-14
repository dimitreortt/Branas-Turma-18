export class Mediator {
    callbacks: { eventName: string, callback: Function }[] = [];

    constructor() { }

    register(eventName: string, fn: Function) {
        this.callbacks.push({
            eventName: eventName,
            callback: fn
        })
    }

    notify(eventName: string, data: any) {
        for (const item of this.callbacks) {
            if (item.eventName === eventName) {
                item.callback(data);
            }
        }
    }
}
