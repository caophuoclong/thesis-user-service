import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configs';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        // ClientsModule.registerAsync([
        //     {
        //         name: 'USER_SERVICE',
        //         useFactory: (configService) => {
        //             console.log(
        //                 '🚀 ~ file: app.module.ts:18 ~ configService:',
        //                 configService,
        //             );
        //             return {
        //                 transport: Transport.TCP,
        //                 options: {
        //                     host: configService.get('rabbitmq'),
        //                 },
        //             };
        //         },
        //         inject: [ConfigModule],
        //     },
        // ]),
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
