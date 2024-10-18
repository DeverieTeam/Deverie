import { Module } from '@nestjs/common';
import { WebContentBackOfficeController } from './web-content-back-office.controller';
import { WebContentBackOfficeService } from './web-content-back-office.service';

@Module({
  controllers: [WebContentBackOfficeController],
  providers: [WebContentBackOfficeService],
})
export class WebContentBackOfficeModule {}
