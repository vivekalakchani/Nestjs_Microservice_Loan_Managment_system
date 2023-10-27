import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3002;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  
  // Ensure that the port for microservices matches the port you're using in your service
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003, // Update this to match your 'loan' service's port
    },
  });

  const config = new DocumentBuilder()
    .setTitle('DailyDebit service Rest Api Authentication')
    .setDescription('The DailyDebit API description')
    .setVersion('1.0')
    .addTag('DailyDebit')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Ensure that the microservice is started before the app listens
  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
