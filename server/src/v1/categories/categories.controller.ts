
import * as express from 'express';
import * as asyncHandler from 'express-async-handler'
import BookNotFoundException from '../exceptions/bookNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateCategoryDto from './dto/categories.dto';
import Category from './category.interface';
import authMiddleware from '../middlewares/auth.middleware';
import restrictTo from '../middlewares/restrictTo.middleware';

import categoryService from './categories.service';

class CategoriesController implements Controller {
    public path = '/categories';
    public router = express.Router();
    private categoryService = new categoryService();
    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllCategories);
        this.router.get(`${this.path}/:id`, this.getCategoryById);
        this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateCategoryDto, true), this.modifyCategory)
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteCategory)
        this.router.post(this.path, authMiddleware, restrictTo('admin'), validationMiddleware(CreateCategoryDto), this.createCategory);
    }

    getAllCategories = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const category = await this.categoryService.getAllCategories()
        response.status(200).send(category);
    })

    private getCategoryById = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const Book = await this.categoryService.getBooksByCategoryId(id)
        console.log(Book)
        if (!Book.length) return next(new BookNotFoundException(id))
        response.status(200).json(Book);
    })

    private modifyCategory = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        // const id = request.params.id;
        // const bookData: Category = request.body;
        // const updateBook = await this.BookService.updateBook(id, bookData);
        // if (!updateBook) return next(new BookNotFoundException(id))
        // const mailSender = new sendEmailWhenUpdateBook().IntializeMail()
        // const Notify = new NotificationService()
        // Notify.Services = [mailSender]
        // Notify.Notify()
        // response.sendStatus(204);
    })


    private createCategory = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const CategoryData: Category = request.body;
        const createdCategory = await this.categoryService.createCategory(CategoryData)
        // const mailSender = new sendEmailWhenCreateBook().IntializeMail()
        // const Notify = new NotificationService()
        // Notify.Services = [mailSender]
        // Notify.Notify()
        response.send(createdCategory);
    });

    private deleteCategory = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        // const id = request.params.id;
        // const Book = await this.BookService.deleteBook(id)
        // if (!Book) return next(new BookNotFoundException(id))
        // const mailSender = new sendEmailWhenDeleteBook().IntializeMail()
        // const Notify = new NotificationService()
        // Notify.Services = [mailSender]
        // Notify.Notify()
        // response.sendStatus(204);
    })

}

export default CategoriesController;