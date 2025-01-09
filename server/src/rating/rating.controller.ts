import { Body, Controller, Delete, Post, Put, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('rating')
export class RatingController {
  constructor(private service: RatingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRating(
    @Body()
    rating: {
      type: 'up' | 'down';
      rater: number;
      rated_post: number;
    },
  ) {
    return this.service.createRating(rating);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateRating(
    @Body()
    rating: {
      type: 'up' | 'down';
      rater: number;
      rated_post: number;
    },
  ) {
    return this.service.updateRating(rating);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteRating(
    @Body()
    rating: {
      rater: number;
      rated_post: number;
    },
  ) {
    return this.service.deleteRating(rating);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('number/:type')
  async getRatingNumberByType(
    @Param('type') type: 'all' | 'up' | 'down',
    @Query('raterId') raterId: string | undefined,
  ) {
    return this.service.getRatingNumberByType({
      type: type,
      raterId: raterId === undefined ? undefined : parseInt(raterId)
    });
  }
}
