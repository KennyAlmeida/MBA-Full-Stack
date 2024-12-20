import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
