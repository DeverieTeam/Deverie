import { Member } from 'src/member/member.entity/member.entity';
import {
  Column,
  Entity,
  ManyToOne,
  // JoinTable,
  // ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  type: 'Up' | 'Down';
  @ManyToOne(() => Member, (member) => member.ratings)
  rater: Member;
}
