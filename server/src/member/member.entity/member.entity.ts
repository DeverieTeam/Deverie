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
  MEMBER = 'Member',
  MODERATOR = 'Moderator',
  ADMINISTRATOR = 'Administrator',
}

export enum MemberTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export enum MemberLanguage {
  FRENCH = 'Français',
  ENGLISH = 'English',
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
  @Column({ type: 'varchar', length: 255, nullable: true })
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
  @Column({ type: 'int', default: 0 })
  post_count: number;
  @OneToMany(() => Rating, (rating) => rating.rater)
  ratings: Rating[];
  @OneToMany(() => Post, (post) => post.author)
  posts: Rating[];
  @OneToMany(() => Post, (post) => post.modification_author)
  modified_posts: Rating[];
  @ManyToMany(() => Post, (post) => post.is_favourited_by)
  @JoinTable({
    name: 'favourite',
  })
  favourites: Post[];
}
