import { Post } from '../../post/post.entity/post.entity';
import { Member } from '../../member/member.entity/member.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RatingType {
  UP = 'Up',
  DOWN = 'Down',
}

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: RatingType })
  type: RatingType;
  @ManyToOne(() => Member, (member) => member.ratings)
  rater: Member;
  @ManyToOne(() => Post, (post) => post.ratings)
  rated_post: Post;
}
