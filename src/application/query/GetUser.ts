import { UserDAOI } from "../../domain/dao/UserDAOI";
import { GetUserOutput } from "../dto/GetUserOutput";

export class GetUser {
    constructor(private userDao: UserDAOI) { }

    async execute(input: GetUserInput): Promise<GetUserOutput | null> {
        const user = await this.userDao.getUserByEmail(input.email);
        if (!user) {
            return null
        }
        return new GetUserOutput(user)
    }
}

type GetUserInput = {
    email: string
}