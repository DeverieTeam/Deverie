import { Tag } from '../../tag/tag.entity/tag.entity';
import { Member } from '../../member/member.entity/member.entity';
import { Rating } from '../../rating/rating.entity/rating.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PostType {
  TOPIC = 'Topic',
  QUESTION = 'Question',
  COMMENT = 'Comment',
  ANSWER = 'Answer',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  title: string;
  @CreateDateColumn({ type: 'date' })
  creation_date: Date;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'enum', enum: PostType })
  type: PostType;
  @Column({ type: 'int', nullable: true })
  emergency: number;
  @Column({ type: 'int', nullable: true, default: 0 })
  upvote: number;
  @Column({ type: 'int', nullable: true, default: 0 })
  downvote: number;
  @Column({ type: 'bool', default: true })
  is_opened: boolean;
  @UpdateDateColumn({ type: 'date', nullable: true })
  modification_date: Date;
  @Column({ type: 'bool', default: true })
  is_readable: boolean;
  @Column({ type: 'int', default: 0 })
  replies_count: number;
  @CreateDateColumn({ type: 'date' })
  last_message_date: Date;
  @OneToMany(() => Rating, (rating) => rating.rated_post)
  ratings: Rating[];
  @ManyToMany(() => Member, (member) => member.favourites)
  is_favourited_by: Member[];
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tag',
  })
  tags: Tag[];
  @ManyToOne(() => Member, (member) => member.posts)
  author: Member;
  @ManyToOne(() => Member, (member) => member.modified_posts)
  modification_author: Member;
  @ManyToOne(() => Post, (post) => post.replies)
  reply_to: Post;
  @OneToMany(() => Post, (post) => post.reply_to)
  replies: Post[];
}
