import { Injectable } from '@nestjs/common';

export type user = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'ayoubamer',
            password: 'ayoub123',
        },
        {
            userId: 2,
            username: 'ademjerbi',
            password: 'adem123',
        },
    ]

    async findOne(username: string): Promise<user | undefined> {
        return this.users.find(user => user.username === username);
    }
}
