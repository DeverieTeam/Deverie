import { Module } from '@nestjs/common';
import { WebContentController } from './web-content.controller';
import { WebContentService } from './web-content.service';
import { BackOfficeModule } from './back-office/back-office.module';

@Module({
  controllers: [WebContentController],
  providers: [WebContentService],
  imports: [BackOfficeModule]
})
export class WebContentModule {}
