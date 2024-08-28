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

  refinePostData(data: Post[]) {
    const refinedData = [];
    for (const post of data) {
      const refinedTags = [];
      for (const tag of post.tags) {
        refinedTags.push({
          id: tag.id,
          name: tag.name,
          icon: tag.icon,
        });
      }

      const refinedPost = {
        id: post.id,
        author: {
          name: post.author.name,
          profile_picture: post.author.profile_picture,
        },
        tags: refinedTags,
        creation_date: post.creation_date,
        title: post.title,
        replies_count: post.replies_count,
        last_message_date: post.last_message_date,
      };
      if (post.author.displayed_name) {
        refinedPost.author.name = post.author.displayed_name;
      }
      refinedData.push(refinedPost);
    }
    return refinedData;
  }

  async getPopularOrRecentPosts(max: number, sort: 'recent' | 'popular') {
    const query = this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags');

    if (sort === 'recent') {
      query.orderBy('post.last_message_date', 'DESC');
    } else if (sort === 'popular') {
      query.orderBy('post.replies_count', 'DESC');
    } else {
      throw error;
    }

    let response = await query.getMany();

    response = response
      .filter((post) => post.type === 'Topic' || post.type === 'Question')
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned);

    const limit = response.slice(0, Math.min(response.length, max));

    return this.refinePostData(limit);
  }

  async getPostsByType(
    type: 'Topic' | 'Question',
    max: number,
    page: number,
    tags: string[] | string = [],
    search: string = '',
    sort: 'recent' | 'popular' | 'ancient' | 'discreet',
  ) {
    if (typeof tags === 'string') {
      tags = [tags];
    }

    search = search.toUpperCase();

    const query = this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags');

    if (sort === 'recent') {
      query.orderBy('post.last_message_date', 'DESC');
    } else if (sort === 'popular') {
      query.orderBy('post.replies_count', 'DESC');
    } else if (sort === 'ancient') {
      query.orderBy('post.last_message_date', 'ASC');
    } else if (sort === 'discreet') {
      query.orderBy('post.replies_count', 'ASC');
    } else {
      throw error;
    }
    let response = await query.getMany();

    response = response
      .filter((post) => post.type === type)
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned)
      .filter((post) => post.title.toUpperCase().includes(search))
      .filter((post) => {
        if (tags.length === 0) {
          return true;
        }
        for (const tag of post.tags) {
          for (const value of tags) {
            if (value === tag.name) {
              return true;
            }
          }
        }
        return false;
      });

    const limit = response.slice(
      max * page,
      Math.min(response.length, max * page + max),
    );

    return this.refinePostData(limit);
  }
}
