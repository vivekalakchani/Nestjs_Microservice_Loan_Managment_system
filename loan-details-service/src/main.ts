import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, headers, etc.)
    optionsSuccessStatus: 204, // Set the status for successful preflight requests
  });
  const config = new DocumentBuilder()
    .setTitle('Customer - Loan service Rest Api Authentication')
    .setDescription('The Customer -Loan API description')
    .setVersion('1.0')
    .addTag('Customer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);

}

bootstrap();
