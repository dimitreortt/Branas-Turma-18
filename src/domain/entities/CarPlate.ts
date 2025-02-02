export class CarPlate {
    constructor(private value: string) {
        this.validate()
    }

    private validate() {
        const oldPattern = /^[A-Z]{3}-\d{4}$/;      // Formato antigo: ABC-1234
        const mercosulPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/; // Formato Mercosul: ABC1D23
        const isValid = oldPattern.test(this.value) || mercosulPattern.test(this.value);
        if (!isValid) throw new Error("Invalid car plate");
    }

    getValue() {
        return this.value
    }
}
