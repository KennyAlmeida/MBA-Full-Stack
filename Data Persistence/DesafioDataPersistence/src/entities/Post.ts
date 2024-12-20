import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { Author } from "./Author";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Author, (author) => author.posts)
  author!: Author;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  constructor(title: string, text: string, author: Author) {
    this.title = title;
    this.text = text;
    this.author = author;
  }
}