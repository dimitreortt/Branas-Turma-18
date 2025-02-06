import { UserDAOI } from "../../domain/dao/UserDAOI";
import { inject } from "../../infra/di/Registry";
import { GetUserOutput } from "../dto/GetUserOutput";

export class GetUser {
    @inject('userDao')
    private userDao?: UserDAOI;

    constructor() { }

    async execute(input: GetUserInput): Promise<GetUserOutput | null> {
        const user = await this.userDao?.getUserByEmail(input.email);
        if (!user) {
            return null
        }
        return new GetUserOutput(user)
    }
}

type GetUserInput = {
    email: string
}