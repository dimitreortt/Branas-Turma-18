export class UserDTO {
    constructor(readonly id: number, readonly name: string, readonly cpf: string, readonly email: string, readonly carPlate: string, readonly userType: number) { }
}
