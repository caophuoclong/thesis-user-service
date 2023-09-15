import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
BigInt.prototype['toJSON'] = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            // options: {
            //     port: 3919,
            // },
            options: {
                urls: ['amqp://selfserver:5672'],
                queue: 'user_queue',
            },
        },
    );
    await app.listen();
}
bootstrap();
