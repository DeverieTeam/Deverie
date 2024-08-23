import { Post } from 'src/post/post.entity/post.entity';
import { Rating } from 'src/rating/rating.entity/rating.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column({ type: 'varchar', length: 50 })
  role: 'Member' | 'Moderator' | 'Administrator';
  @Column({ type: 'bool' })
  is_banned: boolean;
  @Column({ type: 'varchar', length: 100, nullable: true })
  displayed_name: string;
  @Column({ type: 'varchar', length: 50 })
  theme: 'Light' | 'Dark';
  @Column({ type: 'varchar', length: 50 })
  language: 'French';
  //   @Column({ type: 'int' })
  //   post_count: number;
  @OneToMany(() => Rating, (rating) => rating.rater)
  ratings: Rating[];
  @ManyToMany(() => Post, (post) => post.is_favourited_by)
  @JoinTable({
    name: 'favourite',
  })
  favourites: Post[];
}
