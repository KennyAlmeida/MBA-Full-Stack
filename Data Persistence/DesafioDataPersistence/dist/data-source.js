"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Author_1 = require("./entities/Author");
const Post_1 = require("./entities/Post");
const Comment_1 = require("./entities/Comment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Author_1.Author, Post_1.Post, Comment_1.Comment],
    migrations: [],
    subscribers: [],
});
