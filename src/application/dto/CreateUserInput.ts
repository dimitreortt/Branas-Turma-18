export class CreateUserInput {
    constructor(readonly name: string, readonly email: string, readonly cpf: string, readonly carPlate: string, readonly userType: number) {}
}
