import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: '001',
                username: 'admin',
                password: 'admin1234'
            },
            {
                id: '002',
                username: 'user',
                password: 'user1234'
            }
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
