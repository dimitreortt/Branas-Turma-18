export interface DatabaseI {
    query(statement: string, params?: any[]): Promise<any[]>;
}


export class Database implements DatabaseI {
    constructor() { }

    query(statement: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
