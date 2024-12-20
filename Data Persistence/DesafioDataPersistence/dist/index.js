"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Author_1 = require("./entities/Author");
const Post_1 = require("./entities/Post");
const Comment_1 = require("./entities/Comment");
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Author_1.Author, Post_1.Post, Comment_1.Comment],
    migrations: [],
    subscribers: [],
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource.initialize();
        const queryRunner = AppDataSource.createQueryRunner();
        yield queryRunner.startTransaction();
        try {
            // Cria e salva o User
            const user1 = new User_1.User("Kenny Almeida", "kenny@hotmail.com");
            yield queryRunner.manager.save(user1);
            const author1 = new Author_1.Author(user1.name, user1.email, "tech,programming", "Almeida", "Kenny Almeida");
            yield queryRunner.manager.save(author1);
            const post1 = new Post_1.Post("Meu primeiro post", "Este é meu primeiro post", author1);
            yield queryRunner.manager.save(post1);
            const comment1 = new Comment_1.Comment("Otimo post, nota 10", post1, user1);
            yield queryRunner.manager.save(comment1);
            console.log("User, Author, Post e Comentário salvos no banco de dados");
            // Consultar
            const foundAuthor = yield queryRunner.manager.getRepository(Author_1.Author).findOne({
                where: { id: 1 },
                relations: ["posts", "comments"],
            });
            console.log("Consultando autor ", foundAuthor);
            const foundPost = yield queryRunner.manager.getRepository(Post_1.Post).findOne({
                where: { id: 1 },
                relations: ["comments", "author"],
            });
            console.log("Consultando post: ", foundPost);
            // **Operação de Atualização**
            if (foundAuthor) {
                foundAuthor.name = "Kenny Almeida";
                yield queryRunner.manager.save(foundAuthor);
                console.log("Autor atualizado: ", foundAuthor);
            }
            // **Operação de Deleção**
            if (foundPost) {
                yield queryRunner.manager.remove(foundPost);
                console.log("Post deletado");
            }
            if (foundAuthor) {
                yield queryRunner.manager.remove(foundAuthor);
                console.log("Autor deletado");
            }
            yield queryRunner.commitTransaction();
        }
        catch (error) {
            yield queryRunner.rollbackTransaction();
            console.log(error);
        }
        finally {
            yield queryRunner.release();
            yield AppDataSource.destroy();
        }
    });
}
run().catch((error) => console.log(error));
