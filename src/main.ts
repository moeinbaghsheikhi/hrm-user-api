// وارد کردن ماژول‌های مورد نیاز از NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// تعریف تابع اصلی برنامه
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  
   // Create a Swagger document
   const config = new DocumentBuilder()
    .setTitle('HR - API Documentation')
    .setDescription('مستندات کار با api پروژه hr')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'BearerAuth',
    )
    .build();

    const document = SwaggerModule.createDocument(app, config);

    // Serve Swagger UI at /swagger endpoint
    SwaggerModule.setup('docs', app, document);

  // این کد اجرایی، ماژول اصلی برنامه‌ی شما یعنی AppModule را می‌سازد و تنظیمات مورد نیاز برای اجرای برنامه را اعمال می‌کند. سپس با استفاده از تابع listen، برنامه را بر روی پورت مشخص شده یا پورت پیش‌فرض (3000) اجرا می‌کند تا منتظر درخواست‌های ورودی از کلاینت باشد.
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}

// اجرای تابع bootstrap برای شروع اجرای میکروسرویس
bootstrap();
