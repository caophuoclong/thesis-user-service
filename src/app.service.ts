import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { hash, verify } from 'argon2';
import * as crypto from 'crypto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
    constructor(
        @Inject('PRISMA_SERVICE')
        private readonly prismaService: PrismaService,
    ) {}
    async createUser(
        data: Pick<user, 'first_name' | 'username' | 'password' | 'email'>,
    ): Promise<any> {
        const { first_name, username, password, email } = data;
        const newPassword = await this.hashPassword(password);
        try {
            await this.prismaService.user.create({
                data: {
                    username,
                    password: newPassword,
                    email,
                    first_name,
                },
            });
            return {
                message: 'Created user successfully',
            };
        } catch (error) {
            console.log(
                '🚀 ~ file: app.service.ts:36 ~ AppService ~ error:',
                error,
            );
            if (error.code === 'P2002') {
                return {
                    message: 'Username or email already exists',
                };
            }
            return {
                message: 'Error creating user',
            };
        }
    }
    async login(username: string, password: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordValid = await this.verifyPassword(
            password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid password');
        }

        return this.parseObject(user);
    }
    private generateSalt() {
        return crypto.randomBytes(32);
    }
    private hashPassword(password: string): Promise<string> {
        const salt = this.generateSalt();
        return hash(password, {
            salt,
        });
    }
    private verifyPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return verify(hashedPassword, password);
    }
    private parseObject(obj: Record<string, any>) {
        return {
            ...obj,
            createdAt: obj.createdAt?.toString(),
            updatedAt: obj.updatedAt?.toString(),
        };
    }
}
