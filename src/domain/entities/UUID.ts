import crypto from 'crypto'

export class UUID {
    constructor(private value: string) {}

    static create() {
        const randomUUID = crypto.randomUUID();
        return new UUID(randomUUID);
    }

    getValue() {
        return this.value;
    }
}
