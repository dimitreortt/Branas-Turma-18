export class Email {
    constructor(private value: string) {
        this.validate()
    }

    private validate() {
        if(!this.value.match(/^(.+)@(.+)$/)) throw new Error('Invalid email')
    }   

    getValue() {
        return this.value
    }
}
