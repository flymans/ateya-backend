import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from '../products/products.model';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        console.log({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });

        sequelize.addModels([Product]);

        await sequelize.sync();

        return sequelize;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['SEQUELIZE'],
})
export class DatabaseModule {}
