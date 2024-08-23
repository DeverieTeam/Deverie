import {
  Column,
  Entity,
  // JoinTable,
  // ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  icon: string;
  @Column({ type: 'varchar', length: 100 })
  family: 'Language' | 'Environment' | 'Technology';
}
