import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import databaseConfig from './core/config/database.config';
import authConfig from './core/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    CompanyModule,
    CategoryModule,
    TagModule,
    PostModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
