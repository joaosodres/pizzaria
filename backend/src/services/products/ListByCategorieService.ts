import prismaClient from "../../prisma";

interface ProductRequest {
    categoryId: string;
}

class ListByCategorieService {
    async execute({ categoryId }: ProductRequest) {
        //id-bebidas
        const findByCategory = await prismaClient.product.findMany({
            where: {
                categoryId: categoryId
            }
        });

        return findByCategory;
    }
}

export { ListByCategorieService };