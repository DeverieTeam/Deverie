import { Member } from 'src/member/member.entity/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;
  @CreateDateColumn({ type: 'date' })
  creation_date: Date;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'varchar', length: 50 })
  type: 'Topic' | 'Question' | 'Comment' | 'Answer';
  @Column({ type: 'int', nullable: true })
  emergency: number;
  //   @Column({ type: 'int', nullable: true })
  //   upvote: number;
  //   @Column({ type: 'int', nullable: true })
  //   downvote: number;
  @Column({ type: 'bool' })
  is_opened: boolean;
  @UpdateDateColumn({ type: 'date' })
  modification_date: Date;
  @Column({ type: 'bool' })
  is_readable: boolean;
  @ManyToMany(() => Member, (member) => member.favourites)
  is_favourited_by: Member[];
}
