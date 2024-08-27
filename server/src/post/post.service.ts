import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity/post.entity';
import { error } from 'console';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPopularOrRecentPosts(max: number, sort: 'recent' | 'popular') {
    let response;
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags');

    if (sort === 'recent') {
      query.orderBy('post.last_message_date', 'DESC');
    } else if (sort === 'popular') {
      query.orderBy('post.replies_count', 'DESC');
    } else {
      throw error;
    }
    response = await query.getMany();

    response = response
      .filter((post) => post.type === 'Topic' || post.type === 'Question')
      .filter((post) => post.is_readable);

    const limit = [];
    for (let i = 0; i < response.length && i <= max - 1; i++) {
      limit.push(response[i]);
    }
    response = limit;

    const accurate = [];
    for (const post of response) {
      const accTags = [];
      for (const tag of post.tags) {
        const accTag = {
          id: tag.id,
          name: tag.name,
          icon: tag.icon,
        };
        accTags.push(accTag);
      }

      const accPost = {
        id: post.id,
        author: {
          name: post.author.name,
          profile_picture: post.author.profile_picture,
        },
        tags: accTags,
        creation_date: post.creation_date,
        title: post.title,
        replies_count: post.replies_count,
        last_message_date: post.last_message_date,
      };
      if (post.author.displayed_name) {
        accPost.author.name = post.author.displayed_name;
      }
      accurate.push(accPost);
    }
    response = accurate;

    return response;
  }

  async getTopics(
    max: number,
    page: number,
    filters: string[],
    search: string,
    sort: string,
  ) {
    let response;
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags');

    if (sort === 'recent') {
      query.orderBy('post.last_message_date', 'DESC');
    } else if (sort === 'popular') {
      query.orderBy('post.replies_count', 'DESC');
    } else {
      throw error;
    }
    response = await query.getMany();

    response = response
      .filter((post) => post.type === 'Topic')
      .filter((post) => post.is_readable)
      .filter((post) => post.title.toUpperCase().includes(search));

    const limit = [];
    for (
      let i = max * page;
      i < response.length && i <= max * page + (max - 1);
      i++
    ) {
      limit.push(response[i]);
    }
    response = limit;

    const accurate = [];
    for (const post of response) {
      const accTags = [];
      for (const tag of post.tags) {
        const accTag = {
          id: tag.id,
          name: tag.name,
          icon: tag.icon,
        };
        accTags.push(accTag);
      }

      const accPost = {
        id: post.id,
        author: {
          name: post.author.name,
          profile_picture: post.author.profile_picture,
        },
        tags: accTags,
        creation_date: post.creation_date,
        title: post.title,
        replies_count: post.replies_count,
        last_message_date: post.last_message_date,
      };
      if (post.author.displayed_name) {
        accPost.author.name = post.author.displayed_name;
      }
      accurate.push(accPost);
    }
    response = accurate;

    return response;
  }
}
