import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.entity/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
  ) {}

  async createRating(rating) {
    const existingRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.rater = :rater', { rater: rating.rater })
      .andWhere('rating.rated_post = :rated_post', {
        rated_post: rating.rated_post,
      })
      .getOne();

    if (existingRating) {
      throw new HttpException(
        {
          message: 'Already existing vote',
          error: 'Already existing vote',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: 'Already existing vote',
        },
      );
    } else {
      const returnedValue = await this.ratingRepository.save(rating);
      return {
        id: returnedValue.id,
      };
    }
  }

  async updateRating(rating) {
    const existingRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.rater = :rater', { rater: rating.rater })
      .andWhere('rating.rated_post = :rated_post', {
        rated_post: rating.rated_post,
      })
      .getOne();

    if (!existingRating) {
      throw new HttpException(
        {
          message: 'No existing vote',
          error: 'No existing vote',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: 'No existing vote',
        },
      );
    } else {
      const newRating = {
        id: existingRating.id,
        type: rating.type,
      };

      const returnedValue = await this.ratingRepository.save(newRating);

      return {
        id: returnedValue.id,
      };
    }
  }

  async deleteRating(rating) {
    const existingRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.rater = :rater', { rater: rating.rater })
      .andWhere('rating.rated_post = :rated_post', {
        rated_post: rating.rated_post,
      })
      .getOne();

    if (!existingRating) {
      throw new HttpException(
        {
          message: 'No existing vote',
          error: 'No existing vote',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: 'No existing vote',
        },
      );
    } else {
      await this.ratingRepository.delete(existingRating.id);
    }
  }

  async getRatingNumberByType(args: {
    type: 'all' | 'up' | 'down';
    raterId?: number;
  }) {
    const response = await this.ratingRepository
      .createQueryBuilder('rating')
      .innerJoinAndSelect('rating.rater', 'rater')
      .getMany();

    //conditional sql query depending of the url queries
    const filteredResponse = response.filter(
      (rate) =>
        //if type is 'all', select all else only the given type
        (args.type.toString() === 'all' ? true : rate.type === args.type.toString()) &&
        //if raterId is defined, only rates from the specified rater id
        (args.raterId === undefined ? true : rate.rater.id === args.raterId)
    );
    return { number: filteredResponse.length };
  }
}
