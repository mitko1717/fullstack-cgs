import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsBoolean, IsString } from 'class-validator';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(3, 50)
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column({ default: false })
  @IsBoolean()
  completed: boolean;
}
