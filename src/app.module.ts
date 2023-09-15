import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
    ],

    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'PRISMA_SERVICE',
            useFactory: () => {
                return new PrismaService();
            },
        },
    ],
})
export class AppModule {}
