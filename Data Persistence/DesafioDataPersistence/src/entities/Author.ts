import { Entity, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Author extends User {
  @Column()
  tags!: string;

  @Column()
  surname!: string;

  @Column()
  completeName!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  constructor(name: string, email: string, tags: string, surname: string, completeName: string) {
    super(name, email);
    this.tags = tags;
    this.surname = surname;
    this.completeName = completeName;
  }
}