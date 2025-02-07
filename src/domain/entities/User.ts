/**
 * User Types:
 * 1 -> Passenger
 * 2 -> Driver
 */

import { CarPlate } from "../vo/CarPlate"
import { Cpf } from "../vo/Cpf"
import { Email } from "../vo/Email"
import { Name } from "../vo/Name"
import { UUID } from "../vo/UUID"

export class User {
    private userId: UUID
    private name: Name
    private email: Email
    private cpf: Cpf
    private carPlate: CarPlate

    constructor(userId: string, name: string, email: string, cpf: string, carPlate: string, readonly userType: number) {
        this.userId = new UUID(userId)
        this.name = new Name(name)
        this.email = new Email(email)
        this.cpf = new Cpf(cpf)
        this.carPlate = new CarPlate(carPlate)
    }

    static create(name: string, email: string, cpf: string, carPlate: string, userType: number) {
        const userId = UUID.create()
        return new User(userId.getValue(), name, email, cpf, carPlate, userType)
    }

    getUserId() {
        return this.userId.getValue()
    }

    getName() {
        return this.name.getValue()
    }

    getEmail() {
        return this.email.getValue()
    }

    getCpf() {
        return this.cpf.getValue()
    }

    getCarPlate() {
        return this.carPlate.getValue()
    }
}
