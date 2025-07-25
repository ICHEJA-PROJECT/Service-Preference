import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envsValues } from './core/getEnvs';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PREFERENCES_SERVICE_OPTIONS } from './shared/constants/preferences_service_options';

async function bootstrap() {
  const logger = new Logger('Service-Preferences')
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_QUEUE,
          queueOptions: {
            durable: true,
          }
        }
      }
    );

    await app.listen();
    logger.log('Preferences microservice is running...');
  } catch (error) {
    logger.error('Error starting Preferences microservice', error);
  }
}
bootstrap();
