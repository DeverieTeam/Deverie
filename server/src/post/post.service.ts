import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getLastMessageDate(post: Post) {
    if (post.replies.length > 0) {
      return post.replies.sort((a, b) => {
        return (
          new Date(b.creation_date).getTime() -
          new Date(a.creation_date).getTime()
        );
      })[0].creation_date;
    } else {
      return post.creation_date;
    }
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
        last_message_date: this.getLastMessageDate(post),
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

  async getPopularOrRecentPosts(max: string, sort: 'recent' | 'popular') {
    let numMax = parseInt(max);
    if (numMax < 1 || numMax > 20 || Number.isNaN(numMax)) {
      numMax = 10;
    }

    const response = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.replies', 'replies')
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
            new Date(this.getLastMessageDate(b)).getTime() -
            new Date(this.getLastMessageDate(a)).getTime()
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
      Math.min(filteredResponse.length, numMax),
    );

    return this.refinePostData(pagedResponse);
  }

  async getPostsByType(
    type: 'Topic' | 'Question',
    max: string,
    page: string,
    tags: string[] | string = [],
    search: string = '',
    sort: 'recent' | 'popular' | 'ancient' | 'discreet',
  ) {
    let numMax = parseInt(max);
    let numPage = parseInt(page) - 1;

    if (numMax < 1 || numMax > 20 || Number.isNaN(numMax)) {
      numMax = 10;
    }

    if (numPage < 0 || Number.isNaN(numPage)) {
      numPage = 0;
    }

    if (typeof tags === 'string') {
      tags = [tags];
    }

    search = search.toUpperCase();

    const response = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.replies', 'replies')
      .getMany();

    switch (sort) {
      case 'ancient':
        response.sort((a, b) => {
          return (
            new Date(this.getLastMessageDate(a)).getTime() -
            new Date(this.getLastMessageDate(b)).getTime()
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
            new Date(this.getLastMessageDate(b)).getTime() -
            new Date(this.getLastMessageDate(a)).getTime()
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

    if (numPage > Math.floor(responseLength / numMax)) {
      numPage = Math.floor(responseLength / numMax);
    }

    const pagedResponse = filteredResponse.slice(
      numMax * numPage,
      Math.min(responseLength, numMax * numPage + numMax),
    );

    return this.refinePostData(pagedResponse, responseLength);
  }
}
