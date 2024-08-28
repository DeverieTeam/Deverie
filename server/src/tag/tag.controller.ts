import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private service: TagService) {}

  @Get(':family')
  async getTags(@Param('family') family: string) {
    return this.service.getTagsByFamily(family);
  }
}
