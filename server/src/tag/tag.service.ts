import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async getTagsByFamily(family) {
    return await this.tagRepository.find({
      select: ['id', 'name', 'icon', 'family'],
      where: [{ family: family }],
    });
  }

  async getAllTagsNames() {
    return await this.tagRepository.find({
      select: ['id', 'name', 'family'],
    });
  }
}
