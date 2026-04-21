"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(reflector));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('RNEC Ethics Review System API')
        .setDescription('Digital Research Ethics Review System — REST API for managing IRB/RNEC ethics review workflows, ' +
        'submissions, reviews, decisions, payments, and monitoring.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT access token',
        in: 'header',
    }, 'access-token')
        .addServer(`http://localhost:${process.env.PORT ?? 4000}`, 'Local Development')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = parseInt(process.env.PORT ?? '4000', 10);
    await app.listen(port);
    console.log(`[Bootstrap] Application running on: http://localhost:${port}/api/v1`);
    console.log(`[Bootstrap] Swagger docs at:        http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map