import { Request, Response } from 'express';
import { ListByCategorieService } from '../../services/products/ListByCategorieService';

class ListByCategorieController {
    async handle(req: Request, res: Response) {
        const categoryId = req.query.categoryId as string;

        const listByCategorie = new ListByCategorieService();

        const products = await listByCategorie.execute({ categoryId });

        return res.json(products);
    }
}

export { ListByCategorieController };