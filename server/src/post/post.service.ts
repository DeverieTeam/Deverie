import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
          id: post.author.id,
          name: post.author.name,
          profile_picture: post.author.profile_picture,
        },
        tags: refinedTags,
        creation_date: post.creation_date,
        type: post.type,
        is_opened: post.is_opened,
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

  refineSinglePostData(data: Post, length?: number) {
    const refinedTags = [];
    for (const tag of data.tags) {
      refinedTags.push({
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
      });
    }

    const refinedReplies = [];
    if (data.replies.length > 0) {
      for (const reply of data.replies) {
        refinedReplies.push({
          id: reply.id,
        });
      }
    }

    const refinedData: {
      id: number;
      author: {
        id: number;
        name: string;
        profile_picture: string;
        is_banned: boolean;
        role: 'member' | 'moderator' | 'administrator';
      };
      tags: {
        id: number;
        name: string;
        icon: string;
      }[];
      creation_date: Date;
      type: string;
      title: string;
      content: string;
      is_opened: boolean;
      is_readable: boolean;
      modification_date: Date;
      modification_author: null | string;
      emergency: null | number;
      results_length: null | number;
      replies: null | { id: number }[];
    } = {
      id: data.id,
      author: {
        id: data.author.id,
        name: data.author.name,
        profile_picture: data.author.profile_picture,
        is_banned: data.author.is_banned,
        role: data.author.role,
      },
      tags: refinedTags,
      creation_date: data.creation_date,
      type: data.type,
      title: data.title,
      content: data.content,
      is_opened: data.is_opened,
      is_readable: data.is_readable,
      modification_date: data.modification_date,
      modification_author: null,
      emergency: null,
      results_length: null,
      replies: null,
    };

    if (data.author.displayed_name) {
      refinedData.author.name = data.author.displayed_name;
    }
    if (data.modification_author) {
      refinedData.modification_author = data.modification_author.name;
    }
    if (data.emergency) {
      refinedData.emergency = data.emergency;
    }
    if (length) {
      refinedData.results_length = length;
    }
    if (data.replies.length > 0) {
      refinedData.replies = refinedReplies;
    }

    return refinedData;
  }

  refineReplyData(data: Post) {
    const refinedReplies = [];
    if (data.replies.length > 0) {
      for (const reply of data.replies) {
        refinedReplies.push({
          id: reply.id,
        });
      }
    }

    const refinedData: {
      id: number;
      author: {
        id: number;
        name: string;
        profile_picture: string;
        role: 'member' | 'moderator' | 'administrator';
      };
      creation_date: Date;
      content: string;
      modification_date: Date;
      modification_author: null | string;
      replies: null | { id: number }[];
    } = {
      id: data.id,
      author: {
        id: data.author.id,
        name: data.author.name,
        profile_picture: data.author.profile_picture,
        role: data.author.role,
      },
      creation_date: data.creation_date,
      content: data.content,
      modification_date: data.modification_date,
      modification_author: null,
      replies: null,
    };

    if (data.author.displayed_name) {
      refinedData.author.name = data.author.displayed_name;
    }
    if (data.modification_author) {
      refinedData.modification_author = data.modification_author.name;
    }
    if (data.replies.length > 0) {
      refinedData.replies = refinedReplies;
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
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.replies', 'replies')
      .leftJoinAndSelect('replies.author', 'replyAuthor')
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
      .filter((post) => post.type === 'topic' || post.type === 'question')
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned);

    for (const post of filteredResponse) {
      if (post.replies && post.replies.length > 0) {
        post.replies = post.replies
          .filter((post) => post.is_readable)
          .filter((post) => !post.author.is_banned);
      }
    }

    const pagedResponse = filteredResponse.slice(
      0,
      Math.min(filteredResponse.length, numMax),
    );

    return this.refinePostData(pagedResponse);
  }

  async getPostsByType(
    type: 'topic' | 'question',
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
      .leftJoinAndSelect('replies.author', 'replyAuthor')
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

    for (const post of filteredResponse) {
      if (post.replies && post.replies.length > 0) {
        post.replies = post.replies
          .filter((post) => post.is_readable)
          .filter((post) => !post.author.is_banned);
      }
    }

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

  async getPostsNumberByType(args: {
    type: 'all' | 'question' | 'topic';
    isClosed?: boolean;
    isBanned?: boolean;
  }) {
    const response = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .getMany();

    switch (args.type) {
      case 'question':
      case 'topic': {
        const filteredResponse = response.filter(
          (post) =>
            post.type === args.type.toString() &&
            (args.isClosed === undefined ? true : post.is_readable) &&
            (args.isBanned === undefined
              ? true
              : post.author.is_banned === args.isBanned) &&
            (args.isClosed === undefined
              ? true
              : post.is_opened === !args.isClosed),
        );
        return { number: filteredResponse.length };
      }
      case 'all':
      default: {
        const filteredResponse = response.filter(
          (post) =>
            (args.isClosed === undefined ? true : post.is_readable) &&
            (args.isBanned === undefined
              ? true
              : post.author.is_banned === args.isBanned) &&
            (args.isClosed === undefined
              ? true
              : post.is_opened === !args.isClosed),
        );
        return { number: filteredResponse.length };
      }
    }
  }

  async createPost(post) {
    const allTitles = await this.postRepository.find({ select: ['title'] });

    let titleTaken = false;

    for (const title of allTitles) {
      if (title.title === post.title) {
        titleTaken = true;
        break;
      }
    }

    if (titleTaken) {
      throw new HttpException(
        {
          message: 'Invalid title',
          error: 'Invalid title',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid title',
        },
      );
    } else {
      const returnedValue = await this.postRepository.save(post);
      return {
        id: returnedValue.id,
      };
    }
  }

  async getPostById(
    id: number,
    max: string,
    page: string,
    sort: 'chrono' | 'recent' | 'rate',
  ) {
    let numMax = parseInt(max);
    let numPage = parseInt(page) - 1;

    if (numMax < 1 || numMax > 20 || Number.isNaN(numMax)) {
      numMax = 10;
    }

    if (numPage < 0 || Number.isNaN(numPage)) {
      numPage = 0;
    }

    const response = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .innerJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.replies', 'replies')
      .leftJoinAndSelect('post.modification_author', 'modification_author')
      .leftJoinAndSelect('replies.author', 'replyAuthor')
      .getOne();

    if (response.type === 'answer' || response.type === 'comment') {
      throw new HttpException(
        {
          message: 'Invalid thread id',
          error: 'Invalid thread id',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Invalid thread id',
        },
      );
    }

    if (response.replies) {
      switch (sort) {
        case 'recent':
          response.replies.sort((a, b) => {
            return (
              new Date(b.creation_date).getTime() -
              new Date(a.creation_date).getTime()
            );
          });
          break;
        case 'rate':
        case 'chrono':
        default:
          response.replies.sort((a, b) => {
            return (
              new Date(a.creation_date).getTime() -
              new Date(b.creation_date).getTime()
            );
          });
          break;
      }
    }

    response.replies = response.replies
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned);

    const responseLength = response.replies.length;

    if (numPage > Math.floor(responseLength / numMax)) {
      numPage = Math.floor(responseLength / numMax);
    }

    response.replies = response.replies.slice(
      numMax * numPage,
      Math.min(responseLength, numMax * numPage + numMax),
    );

    return this.refineSinglePostData(response, responseLength);
  }

  async getReplyById(id: number, sort: 'chrono' | 'recent' | 'rate') {
    const response = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .innerJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.replies', 'replies')
      .leftJoinAndSelect('post.modification_author', 'modification_author')
      .leftJoinAndSelect('replies.author', 'replyAuthor')
      .getOne();

    if (response.type === 'topic' || response.type === 'question') {
      throw new HttpException(
        {
          message: 'Invalid reply id',
          error: 'Invalid reply id',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Invalid reply id',
        },
      );
    }

    if (response.replies) {
      switch (sort) {
        case 'recent':
          response.replies.sort((a, b) => {
            return (
              new Date(b.creation_date).getTime() -
              new Date(a.creation_date).getTime()
            );
          });
          break;
        case 'rate':
        case 'chrono':
        default:
          response.replies.sort((a, b) => {
            return (
              new Date(a.creation_date).getTime() -
              new Date(b.creation_date).getTime()
            );
          });
          break;
      }
    }

    response.replies = response.replies
      .filter((post) => post.is_readable)
      .filter((post) => !post.author.is_banned);

    return this.refineReplyData(response);
  }

  async createReply(post) {
    const returnedValue = await this.postRepository.save(post);
    return {
      id: returnedValue.id,
    };
  }

  async updatePost(post) {
    const returnedValue = await this.postRepository.save(post);
    return {
      id: returnedValue.id,
    };
  }
}
