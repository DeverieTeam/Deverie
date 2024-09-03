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

  getLastMessageDate(postReplies: Post[]) {
    return postReplies.sort((a, b) => {
      return (
        new Date(b.creation_date).getTime() -
        new Date(a.creation_date).getTime()
      );
    })[0].creation_date;
  }

  refinePostData(data: Post[], length?: number) {
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
        replies_count: post.replies.length,
        last_message_date: this.getLastMessageDate(post.replies),
        results_length: null,
      };
      if (post.author.displayed_name) {
        refinedPost.author.name = post.author.displayed_name;
      }
      if (length) {
        refinedPost.results_length = length;
      }
      refinedData.push(refinedPost);
    }
    return refinedData;
  }

  async getPopularOrRecentPosts(max: number, sort: 'recent' | 'popular') {
    if (max < 1 || max > 20) {
      max = 10;
    }

    let response = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags')
      .innerJoinAndSelect('post.replies', 'replies')
      .getMany();

    switch (sort) {
      case 'popular':
        response.sort((a, b) => {
          return b.replies.length - a.replies.length;
        });
        break;
      case 'recent':
      default:
        response.sort((a, b) => {
          return (
            new Date(this.getLastMessageDate(b.replies)).getTime() -
            new Date(this.getLastMessageDate(a.replies)).getTime()
          );
        });
        break;
    }

    const filteredResponse = response
      .filter((post) => post.type === 'Topic' || post.type === 'Question')
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned);

    const pagedResponse = filteredResponse.slice(
      0,
      Math.min(filteredResponse.length, max),
    );

    return this.refinePostData(pagedResponse);
  }

  async getPostsByType(
    type: 'Topic' | 'Question',
    max: number,
    page: number,
    tags: string[] | string = [],
    search: string = '',
    sort: 'recent' | 'popular' | 'ancient' | 'discreet',
  ) {
    if (max < 1 || max > 20) {
      max = 10;
    }

    if (typeof tags === 'string') {
      tags = [tags];
    }

    search = search.toUpperCase();

    let response = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags')
      .innerJoinAndSelect('post.replies', 'replies')
      .getMany();

    switch (sort) {
      case 'ancient':
        response.sort((a, b) => {
          return (
            new Date(this.getLastMessageDate(a.replies)).getTime() -
            new Date(this.getLastMessageDate(b.replies)).getTime()
          );
        });
        break;
      case 'discreet':
        response.sort((a, b) => {
          return a.replies.length - b.replies.length;
        });
        break;
      case 'popular':
        response.sort((a, b) => {
          return b.replies.length - a.replies.length;
        });
        break;
      case 'recent':
      default:
        response.sort((a, b) => {
          return (
            new Date(this.getLastMessageDate(b.replies)).getTime() -
            new Date(this.getLastMessageDate(a.replies)).getTime()
          );
        });
        break;
    }

    const filteredResponse = response
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

    const responseLength = filteredResponse.length;

    const pagedResponse = filteredResponse.slice(
      max * page,
      Math.min(responseLength, max * page + Number(max)),
    );

    return this.refinePostData(pagedResponse, responseLength);
  }
}
