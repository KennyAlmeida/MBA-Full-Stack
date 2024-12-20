import { PrismaClient } from '@prisma/client';
import { create } from 'domain';

const prisma = new PrismaClient();

async function readUsers() {
    const users = await prisma.user.findMany();
    console.log(users);
}

async function createUser() {
    console.log("Creating user...");
    const user = {
        name: "Felipe",
        email: "felipe@hotmail.com"
    };

    const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
    });

    if (existingUser) {
        console.log(`Usuário com o e-mail ${user.email} já existe!`);
        return existingUser;
    }

    console.log("Criando usuário...");

    const newUser = await prisma.user.create({ data: user });
    console.log("Usuário criado:", newUser);
    return newUser;
}

async function main() {
    await readUsers();
    await createUser();
    await readUsers();
}

main();