import { Response, Request } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, categoryId, } = req.body;

        const createProductService = new CreateProductService();

        if (!req.file) {
            throw new Error("Cadastre um produto com foto");
        } else {
            const { originalname, filename: banner } = req.file;

            console.log(banner);

            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                categoryId,
            });

            return res.json(product);
        }


    }
}

export { CreateProductController };

