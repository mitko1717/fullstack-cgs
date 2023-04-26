import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import type { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  private: boolean;

  @ManyToOne('User', 'todos')
  user: Relation<User>;
}
