import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        // verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto");
        }

        const passwordHash = await hash(password, 8);

        // verificar se o email existe na plataforma
        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if (userAlreadyExist) {
            throw new Error("Email já cadastrado");
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export { CreateUserService };