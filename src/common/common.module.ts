import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: '.env',
            isGlobal: true,
            // validationSchema,
            validationOptions: { abortEarly: true },
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class CommonModule {}