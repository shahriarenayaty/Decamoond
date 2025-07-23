import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './utils/Timeout.Interceptor';
import { ErrorHandler } from './utils/error/error-handler';

const options = {
  origin: '*', // attempted "origin":["http://localhost"]
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  // credentials: true,
  // allowedHeaders:
  //   'Content-Type, Accept,Authorization,Access-Control-Allow-Origin',
};
async function bootstrap() {
  console.log('Starting app...');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new TimeoutInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Decamoond API')
    .setDescription('The Decamoond API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(options);
  app.useGlobalFilters(new ErrorHandler());

  await app.listen(3000, '0.0.0.0');
  console.log('App listening on port 3000');
}
bootstrap();
