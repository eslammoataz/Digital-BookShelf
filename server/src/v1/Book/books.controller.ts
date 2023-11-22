import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as sharp from 'sharp';
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
import { v4 as uuidv4 } from 'uuid';
import BookModel from './book.model';
import { uploadSingleImage } from '../middlewares/uploadMiddleware';
import { firebaseUpload } from '../../firebase.upload';

class BooksController implements Controller {
  public path = '/books';
  public router = express.Router();
  private BookService = new BookService();
  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllBooks);
    this.router.get(this.path + '/search', this.getBookBySearch);
    this.router.get(`${this.path}/:id`, this.getBookById);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateBookDto, true),
      this.modifyBook
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteBook);
    this.router.post(
      this.path,
      authMiddleware,
      restrictTo('admin'),
      uploadSingleImage('image'),
      validationMiddleware(CreateBookDto),
      firebaseUpload,
      this.createBook
    );
  }

  private createBook = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const BookData: Book = request.body;
      const tagNames = BookData.tags;
      BookData.cover_book = request.body.downloadURL;

      const createdBook = await this.BookService.createBook(BookData, tagNames);
      // // @ts-ignore
      // if (request.files && request.files.cover_book) {
      //   const imageCoverFileName = `book-${uuidv4()}-${Date.now()}-cover.webp`;
      //   try {
      //     // @ts-ignore
      //     await sharp(request.files.cover_book[0].buffer)
      //       .resize(600, 600)
      //       .toFormat('webp')
      //       .webp({ quality: 85 })
      //       .toFile(`uploads/products/${imageCoverFileName}`);

      //     request.body.imageCover = imageCoverFileName;
      //   } catch (error) {
      //     // Handle any errors that occurred during image processing or file saving.
      //     console.error(error);
      //     response.status(500).json({ error: 'Internal Server Error' });
      //     return;
      //   }
      // } else {
      //   // Handle the case where 'cover_book' property is missing in request.files
      //   response
      //     .status(400)
      //     .json({ error: 'Missing cover_book in request.files' });
      //   return;
      // }
      // const mailSender = new sendEmailWhenCreateBook().IntializeMail();
      // const Notify = new NotificationService();
      // Notify.Services = [mailSender];
      // Notify.Notify();
      response.send(createdBook);
    }
  );

  getAllBooks = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const page = Number(request.query.page) * 1 || 1;
      // const limit = this.queryString.limit * 1 || 12;
      // const skip = (page - 1) * limit;

      // const page = parseInt(request.query.page as string, 10);
      const Books = await this.BookService.getAllBooks(page);
      response.status(200).json({ page: 'page1 fdfdfs', data: Books });
    }
  );

  private getBookBySearch = asyncHandler(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const page = Number(req.query.page) * 1 || 1;
      const searchWord = req.query.searchWord as String;
      const books = await this.BookService.getBooksBySearch(searchWord, page);
      res.status(200).json(books);
    }
  );

  private getBookById = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const id = request.params.id;
      const Book = await this.BookService.getBookById(id);
      if (!Book) return next(new BookNotFoundException(id));
      response.status(200).json(Book);
    }
  );

  private modifyBook = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const id = request.params.id;
      const bookData: Book = request.body;
      const updateBook = await this.BookService.updateBook(id, bookData);
      if (!updateBook) return next(new BookNotFoundException(id));
      // const mailSender = new sendEmailWhenUpdateBook().IntializeMail();
      // const Notify = new NotificationService();
      // Notify.Services = [mailSender];
      // Notify.Notify();
      response.sendStatus(204);
    }
  );

  private deleteBook = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const id = request.params.id;
      const Book = await this.BookService.deleteBook(id);
      if (!Book) return next(new BookNotFoundException(id));
      // const mailSender = new sendEmailWhenDeleteBook().IntializeMail();
      // const Notify = new NotificationService();
      // Notify.Services = [mailSender];
      // Notify.Notify();
      response.sendStatus(200).send('Deleted successfully');
    }
  );
}

export default BooksController;
