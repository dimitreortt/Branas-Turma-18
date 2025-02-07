export class Cpf {
    private CPF_VALID_LENGTH = 11;
    private FIRST_DIGIT_FACTOR = 10;
    private SECOND_DIGIT_FACTOR = 11;

    constructor(private value: string) {
        if (!this.validate(value)) throw new Error('Invalid Cpf')
    }

    private validate (cpf: string) {
        cpf = cpf.replace(/\D/g, "");
        if (cpf.length !== this.CPF_VALID_LENGTH) return false;
        if (this.allDigitsTheSame(cpf)) return false;
        const digit1 = this.calculateDigit(cpf, this.FIRST_DIGIT_FACTOR);
        const digit2 = this.calculateDigit(cpf, this.SECOND_DIGIT_FACTOR);
        return `${digit1}${digit2}` === this.extractDigit(cpf);
    }

    private allDigitsTheSame (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }

    private calculateDigit (cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const remainder = total % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    private extractDigit (cpf: string) {
        return cpf.slice(9);
    }

    getValue() {
        return this.value
    }
}
