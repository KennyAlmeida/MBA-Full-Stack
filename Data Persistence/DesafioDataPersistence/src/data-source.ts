import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Author } from "./entities/Author";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [User, Author, Post, Comment],
  migrations: [],
  subscribers: [],
});