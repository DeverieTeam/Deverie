import { Tag } from '../../tag/tag.entity/tag.entity';
import { Post } from '../../post/post.entity/post.entity';
import { Rating } from '../../rating/rating.entity/rating.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum MemberRole {
  MEMBER = 'member',
  MODERATOR = 'moderator',
  ADMINISTRATOR = 'administrator',
}

export enum MemberTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum MemberLanguage {
  FRENCH = 'french',
  ENGLISH = 'english',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  hashed_password: string;
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column({ type: 'bool' })
  is_email_displayed: boolean;
  @CreateDateColumn({ type: 'date' })
  inscription_date: Date;
  @Column({
    type: 'varchar',
    length: 255,
    default: '/images/profile-picture-default.png',
  })
  profile_picture: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  pronouns: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.MEMBER })
  role: MemberRole;
  @Column({ type: 'bool', default: false })
  is_banned: boolean;
  @Column({ type: 'varchar', length: 100, nullable: true })
  displayed_name: string;
  @Column({ type: 'enum', enum: MemberTheme, default: MemberTheme.LIGHT })
  theme: MemberTheme;
  @Column({
    type: 'enum',
    enum: MemberLanguage,
    default: MemberLanguage.FRENCH,
  })
  language: MemberLanguage;
  @OneToMany(() => Rating, (rating) => rating.rater)
  ratings: Rating[];
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  @OneToMany(() => Post, (post) => post.modification_author)
  modified_posts: Post[];
  @ManyToMany(() => Post, (post) => post.is_favourited_by)
  @JoinTable({
    name: 'favourite',
  })
  favourites: Post[];
  @ManyToMany(() => Tag, (tag) => tag.is_selected_by)
  @JoinTable({
    name: 'member_tag',
  })
  selected_tags: Tag[];
}
