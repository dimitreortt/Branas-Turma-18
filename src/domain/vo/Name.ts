export class Name {
    constructor(private value: string) {
        this.validate()
    }

    private validate() {
        if(!this.value.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
    }

    getValue() {
        return this.value
    }
}
