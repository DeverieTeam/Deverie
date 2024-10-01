import { Param, Query, Controller, Get /*, UseGuards*/ } from '@nestjs/common';
import { WebContentBackOfficeService } from './web-content-back-office.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('webcontent/backoffice')
export class WebContentBackOfficeController {
  constructor(private readonly webContentBackOfficeService: WebContentBackOfficeService) {}

  //@UseGuards(AuthGuard('jwt'))
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
