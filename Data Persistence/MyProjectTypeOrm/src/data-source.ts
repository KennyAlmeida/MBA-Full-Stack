import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Initial1731976068642 } from "./migration/1731976068642-initial"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [Initial1731976068642],
    subscribers: [],
})
