import { Module } from '@nestjs/common';
import { WebContentController } from './web-content.controller';
import { WebContentService } from './web-content.service';
import { WebContentBackOfficeModule } from './back-office/web-content-back-office.module';

@Module({
  controllers: [WebContentController],
  providers: [WebContentService],
  imports: [WebContentBackOfficeModule]
})
export class WebContentModule {}
