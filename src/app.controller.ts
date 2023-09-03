import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) {}
    @MessagePattern({ cmd: 'getUser' })
    getUser(data: any): any {
        console.log(
            '🚀 ~ file: app.controller.ts:10 ~ AppController ~ getUser ~ data:',
            data,
        );
        return {
            id: '9218',
        };
    }
}
