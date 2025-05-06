import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {});
  
    const configService: ConfigService = app.get(ConfigService);
    const port = configService.get('port');

    // init middlewares
    app.enableCors({ origin: '*' });
    app.use(helmet()); // Helmet giúp bảo vệ app khỏi một số lỗ hổng phổ biến bằng cách thiết lập các HTTP headers an toàn
    app.use(morgan("dev")); // giúp log rõ ràng dễ debug cho dev; có nhiều loại: dev, combined, tiny
    app.use(compression()); // Nén response giúp giảm kích thước dữ liệu gửi về client → tải nhanh hơn.
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


    // init db

    // set global prefix router
    app.setGlobalPrefix('api');

    // handle error
    // app.use((req, res, next) => {
    //   res.status(404).json({
    //     statusCode: 404,
    //     message: 'Route not found',
    //     path: req.originalUrl,
    //   });
    // });
    app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
          status: 'error',
          code: statusCode,
          message: error.message || 'Internal server error'
      })
    })

    
    console.log(`Server is running on port: ${port}`);
    await app.listen(port);
  } catch (error) {
    console.log("Error during app bootstrap::: ", error);
    process.exit(1);
  }
}
bootstrap();
