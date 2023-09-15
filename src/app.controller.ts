import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { user } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Controller('users')
export class AppController {
    constructor(
        @Inject('PRISMA_SERVICE')
        private readonly prismaService: PrismaService,
        private readonly appService: AppService,
    ) {}
    @MessagePattern({ cmd: 'getUser' })
    getUser(data: any): any {
        return {
            id: '9218',
        };
    }
    @MessagePattern({
        cmd: 'createUser',
    })
    createUser(
        data: Pick<user, 'first_name' | 'username' | 'password' | 'email'>,
    ): any {
        return this.appService.createUser(data);
    }
    @MessagePattern({
        cmd: 'login',
    })
    async login(data: { username: string; password: string }) {
        try {
            const user = await this.appService.login(
                data.username,
                data.password,
            );
            return {
                error: false,
                data: user,
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            };
        }
    }
}
