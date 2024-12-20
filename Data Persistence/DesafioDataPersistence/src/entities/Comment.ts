import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";  // Ajustando caminho
import { User } from "./User";  // Ajustando caminho

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  constructor(text: string, post: Post, user: User) {
    this.text = text;
    this.post = post;
    this.user = user;
  }
}
