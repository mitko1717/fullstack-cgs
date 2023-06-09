import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import type { Todo } from './todo.entity';
import type { Token } from './token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany('Todo', 'user')
  todos: Relation<Todo[]>;

  @OneToMany('Token', 'user')
  tokens: Relation<Token[]>;
}
