export class User {
    constructor(readonly name: string, readonly email: string, readonly cpf: string, readonly carPlate: string, readonly userType: number) {
        this.validateInput()
    }

    private validateInput() {
        this.validateEmail()
        this.validateCpf()
    }

    private validateEmail() {
        // Implement email validation logic inside service (or here?)
        if (this.email === 'invalidemail') {
            throw new Error('Invalid email')
        }
    }

    private validateCpf() {
        // Implement email validation logic inside service (or here?)
        if (this.cpf === 'invalidcpf') {
            throw new Error('Invalid cpf')
        }
    }
}
