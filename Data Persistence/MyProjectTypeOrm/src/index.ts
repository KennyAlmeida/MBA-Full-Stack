import { AppDataSource } from "./data-source"
import { User } from "./entity/User"


async function criarUsuario(user: User) {
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)
}

async function listaTodosUsuarios() {
    console.log("Loading users from the database...")
    const users = AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)
}

async function removerUsuarios() {
    console.log("Loading users from the database...")
    const users = AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)
}

async function romoverUsuarioPeloNome(nome: string) {
    console.log("Loading users from the database...")
    const usr = await AppDataSource.manager.findOneBy(User, { firstName: nome });
    if(usr != null && usr.id > 0) {
        AppDataSource.manager.remove(usr);
        console.log("User removed: ", usr);
    }
}

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await criarUsuario(user);

    console.log("Loading users from the database...")
    




}).catch(error => console.log(error))
