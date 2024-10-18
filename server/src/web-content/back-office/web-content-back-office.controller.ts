import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebContentBackOfficeService } from './web-content-back-office.service';

@Controller('webcontent/backoffice')
export class WebContentBackOfficeController {
  constructor(private readonly webContentBackOfficeService: WebContentBackOfficeService) {}

  @Get(':type')
  getBackOfficeWebContent(
    @Param('type') type: string,
    @Query('lang') lang: string,
  ) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentBackOfficeService.getBackOfficeWebContent({
      type: type.toLowerCase(),
      lang: lang.toLowerCase(),
    });
  }
}
