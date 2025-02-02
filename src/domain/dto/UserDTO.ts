export class UserDTO {
    constructor(readonly userId: number, readonly name: string, readonly cpf: string, readonly email: string, readonly carPlate: string, readonly userType: number) { }
}
