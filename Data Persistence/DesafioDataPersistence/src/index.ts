import "reflect-metadata";
import { createConnection } from "typeorm";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Author } from "./entities/Author";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [User, Author, Post, Comment],
  migrations: [],
  subscribers: [],
});

async function run() {
  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    // Cria e salva o User
    const user1 = new User("Kenny Almeida", "kenny@hotmail.com");
    await queryRunner.manager.save(user1);

    // Cria e salva o Author associado ao User
    const author1 = new Author(user1.name, user1.email, "tech,programming", "Almeida", "Kenny Almeida");
    await queryRunner.manager.save(author1);

    // Cria e salva o Post associado ao Author
    const post1 = new Post("Meu primeiro post", "Este é meu primeiro post", author1);
    await queryRunner.manager.save(post1);

    // Cria e salva o Comment associado ao Post e ao User
    const comment1 = new Comment("Otimo post, nota 10", post1, user1);
    await queryRunner.manager.save(comment1);

    console.log("User, Author, Post e Comentário salvos no banco de dados");

    // Consultar
    const foundAuthor = await queryRunner.manager.getRepository(Author).findOne({
      where: { id: 1 },
      relations: ["posts", "comments"],
    });
    console.log("Consultando autor ", foundAuthor);

    const foundPost = await queryRunner.manager.getRepository(Post).findOne({
      where: { id: 1 },
      relations: ["comments", "author"],
    });
    console.log("Consultando post: ", foundPost);

    // **Operação de Atualização**
    if (foundAuthor) {
      foundAuthor.name = "Kenny Almeida";
      await queryRunner.manager.save(foundAuthor);
      console.log("Autor atualizado: ", foundAuthor);
    }

    // **Operação de Deleção**
    if (foundPost) {
      await queryRunner.manager.remove(foundPost);
      console.log("Post deletado");
    }

    if (foundAuthor) {
      await queryRunner.manager.remove(foundAuthor);
      console.log("Autor deletado");
    }

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error);
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

run().catch((error) => console.log(error));