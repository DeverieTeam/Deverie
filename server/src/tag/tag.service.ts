import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Tag } from './tag.entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'node:fs';

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

  async invalidPath() {
    throw new HttpException(
      {
        message: 'Invalid path',
        error: 'Invalid path',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: 'Invalid path',
      },
    );
  }

  async createTagIcon(tag) {
    const iconsDirectory = './public/uploads/tagIcons';
    const fileExtension = tag.icon.slice(-4);
    const newFileName = `tag-icon-${tag.name.replace(' ', '-')}${fileExtension}`;
    
    if (fileExtension === '.png') {
      if (fs.existsSync(`${iconsDirectory}/tag-icon-${tag.name.replace(' ', '-')}.jpg`)) {
        fs.unlink(`${iconsDirectory}/tag-icon-${tag.name.replace(' ', '-')}.jpg`,
          (error) => {
            if (error) {
              this.invalidPath();
            }
          }
        );
      }
    } else if (fs.existsSync(`${iconsDirectory}/tag-icon-${tag.name.replace(' ', '-')}.png`)) {
      fs.unlink(`${iconsDirectory}/tag-icon-${tag.name.replace(' ', '-')}.png`,
        (error) => {
          if (error) {
            this.invalidPath();
          }
        }
      );
    }

    fs.rename(`${iconsDirectory}/${tag.icon}`, `${iconsDirectory}/${newFileName}`,
      (error) => {
          if (error) {
            this.invalidPath();
          }
        }
      );
  }

  async createTag(tag) {
    const iconsURL = `http://localhost:3000/public/uploads/tagIcons`;

    const allTagNames = await this.tagRepository.find({ select: ['name'] });

    const tagWithEnteredName = allTagNames.filter((t) => t.name === tag.name);

    if (tagWithEnteredName.length >= 1) {
      throw new HttpException(
        {
          message: 'Invalid name',
          error: 'Invalid name',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid name',
        },
      );
    } else {
      const newFileName = `tag-icon-${tag.name.replace(' ', '-')}${tag.icon.slice(-4)}`;
      this.createTagIcon(tag);
      tag.icon = `${iconsURL}/${newFileName}`;

      const returnedValue = await this.tagRepository.save(tag);
      return {
        id: returnedValue.id,
      };
    }
  }

  async updateTag(tag) {
    const iconsURL = `http://localhost:3000/public/uploads/tagIcons`;
    
    const allTheTags = await this.tagRepository.find({ select: ['id', 'name', 'icon'] });

    const tagWithEnteredName = allTheTags.filter((t) => t.name === tag.name && t.id !== tag.id);

    if (tagWithEnteredName.length >= 1) {
      throw new HttpException(
        {
          message: 'Invalid name',
          error: 'Invalid name',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid name',
        },
      );
    } else {
      if (allTheTags.filter((t) => t.id === tag.id)[0].icon !== tag.icon) {
        const newFileName = `tag-icon-${tag.name.replace(' ', '-')}${tag.icon.slice(-4)}`;
        this.createTagIcon(tag);
        tag.icon = `${iconsURL}/${newFileName}`;
      }
      const returnedValue = await this.tagRepository.save(tag);
      return {
        id: returnedValue.id,
      };
    }
  }

  async deleteTagById(id: number) {
    const iconsDirectory = './public/uploads/tagIcons';

    const theTag = await this.tagRepository.findOne({ select: ['id', 'name'], where: {id: id} });

    if (fs.existsSync(`${iconsDirectory}/tag-icon-${theTag.name.replace(' ', '-')}.jpg`)) {
      fs.unlink(`${iconsDirectory}/tag-icon-${theTag.name.replace(' ', '-')}.jpg`,
        (error) => {
          if (error) {
            this.invalidPath();
          }
        }
      );
    } else if (fs.existsSync(`${iconsDirectory}/tag-icon-${theTag.name.replace(' ', '-')}.png`)) {
      fs.unlink(`${iconsDirectory}/tag-icon-${theTag.name.replace(' ', '-')}.png`,
        (error) => {
          if (error) {
            this.invalidPath();
          }
        }
      );
    }

    let rowsAffected: number = 0;
    let response = await this.tagRepository
      .createQueryBuilder()
      .delete()
      .from('post_tag')
      .where("tagId = :tagId", {tagId: id})
      .execute()
    rowsAffected += response.affected;

    response = await this.tagRepository.delete(id);
    rowsAffected += response.affected;
    return {
        rowsDeleted: rowsAffected,
    };
  }
}
