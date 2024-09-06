import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { TagModule } from './tag/tag.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { RatingModule } from './rating/rating.module';
import { WebContentModule } from './web-content/web-content.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: () => databaseConfig,
    }),
    MemberModule,
    TagModule,
    PostModule,
    RatingModule,
    WebContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
