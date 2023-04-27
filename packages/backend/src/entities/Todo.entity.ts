import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import type { User } from './user.entity';

@Entity()
export class Todo extends BaseEntity {
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

  @Column({ name: 'userid' })
  userId: number;

  @ManyToOne('User', 'todos', { eager: true })
  @JoinColumn({ name: 'userid' })
  user: User;
}
