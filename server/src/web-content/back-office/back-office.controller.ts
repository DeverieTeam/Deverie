import { Param, Query, Controller, Get /*, UseGuards*/ } from '@nestjs/common';
import { BackOfficeService } from './back-office.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('webcontent/backoffice')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get(':type')
  getBackOfficeWebContent(
    @Param('type') type: string,
    @Query('lang') lang: string,
  ) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.backOfficeService.getBackOfficeWebContent({
      type: type.toLowerCase(),
      lang: lang.toLowerCase(),
    });
  }
}
