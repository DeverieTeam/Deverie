import { Member } from '../../member/member.entity/member.entity';
import { Post } from '../../post/post.entity/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TagFamily {
  LANGUAGE = 'language',
  ENVIRONMENT = 'environment',
  TECHNOLOGY = 'technology',
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  icon: string;
  @Column({ type: 'enum', enum: TagFamily })
  family: TagFamily;
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
  @ManyToMany(() => Member, (member) => member.selected_tags)
  is_selected_by: Member[];
}
