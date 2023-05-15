
import * as express from 'express';
import * as asyncHandler from 'express-async-handler'
import BookNotFoundException from '../exceptions/bookNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateBookDto from './dto/Book.dto';
import Book from './book.interface';
import authMiddleware from '../middlewares/auth.middleware';
import restrictTo from '../middlewares/restrictTo.middleware';
import sendEmailWhenCreateBook from './mail/sendEmailWhenCreateBook';
import sendEmailWhenDeleteBook from './mail/sendEmailWhenDeleteBook';
import sendEmailWhenUpdateBook from './mail/sendEmailWhenUpdateBook';
import NotificationService from '../../Notifications/NotificationService';
import BookService from './books.service';

class BooksController implements Controller {
    public path = '/books';
    public router = express.Router();
    private BookService = new BookService();
    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllBooks);
        this.router.get(`${this.path}/:id`, this.getBookById);
        this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateBookDto, true), this.modifyBook)
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteBook)
        this.router.post(this.path, authMiddleware, restrictTo('admin'), validationMiddleware(CreateBookDto), this.createBook);
    }

    getAllBooks = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const Books = await this.BookService.getAllBooks()
        response.status(200).json({page:'page1',Books});
    })

    private getBookById = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const Book = await this.BookService.getBookById(id)
        if (!Book) return next(new BookNotFoundException(id))
        response.status(200).json(Book);
    })

    private modifyBook = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        const bookData: Book = request.body;
        const updateBook = await this.BookService.updateBook(id, bookData);
        if (!updateBook) return next(new BookNotFoundException(id))
        const mailSender = new sendEmailWhenUpdateBook().IntializeMail()
        const Notify = new NotificationService()
        Notify.Services = [mailSender]
        Notify.Notify()
        response.sendStatus(204);
    })


    private createBook = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const BookData: Book = request.body;
        const createdBook = await this.BookService.createBook(BookData)
        const mailSender = new sendEmailWhenCreateBook().IntializeMail()
        const Notify = new NotificationService()
        Notify.Services = [mailSender]
        Notify.Notify()
        response.send(createdBook);
    });

    private deleteBook = asyncHandler(async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const Book = await this.BookService.deleteBook(id)
        if (!Book) return next(new BookNotFoundException(id))
        const mailSender = new sendEmailWhenDeleteBook().IntializeMail()
        const Notify = new NotificationService()
        Notify.Services = [mailSender]
        Notify.Notify()
        response.sendStatus(204);
    })

}

export default BooksController;