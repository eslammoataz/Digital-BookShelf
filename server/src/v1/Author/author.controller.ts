import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import Controller from '../interfaces/controller.interface';
import authorModel from './author.model';
import authMiddleware from '../middlewares/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import NotAllowedToDoThisAction from '../exceptions/NotAllowedToDoThisAction';
import AuthorService from './author.service';
import AuthorData from './author.interface';
import restrictTo from '../middlewares/restrictTo.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateAuthorDto from './dto/author.dto';

class AuthorController implements Controller {
  public path = '/author';
  public router = express.Router();
  private AuthorService = new AuthorService();
  private requestUser: RequestWithUser;

  constructor() {
    this.intializeRoutes();
  }

  pub;
  public intializeRoutes() {
    this.router.get(
      this.path,
      authMiddleware,
      restrictTo('admin'),
      this.getAllAuthors
    );

    this.router.get(
      `${this.path}/getauthor/:id`,
      authMiddleware,
      restrictTo('admin'),
      this.getAuthor
    );

    this.router.patch(
      `${this.path}/editauthor/:id`,
      authMiddleware,
      restrictTo('admin'),
      validationMiddleware(CreateAuthorDto, true),
      this.editAuthor
    );

    this.router.post(
      `${this.path}/addauthor`,
      authMiddleware,
      restrictTo('admin'),
      validationMiddleware(CreateAuthorDto),
      this.addAuthor
    );

    this.router.delete(
      `${this.path}/deleteauthor/:id`,
      authMiddleware,
      restrictTo('admin'),
      this.deleteAuthor
    );
  }

  public getAllAuthors = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const authors = await this.AuthorService.getAllAuthors();
      response.status(200).send(authors);
    }
  );

  public addAuthor = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const createdAuthor = await this.AuthorService.addAuthor(
        request.body.email
      );

      response.send(createdAuthor);
    }
  );

  public getAuthor = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const authorId = parseInt(request.params.id);
      const author = await this.AuthorService.getAuthor(authorId);

      response.send(author);
    }
  );

  public editAuthor = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const authorId = request.params.id;
      const AuthorData: AuthorData = request.body;

      const updatedAuthor = await this.AuthorService.editAuthor(
        authorId,
        AuthorData
      );

      response.send(updatedAuthor);
    }
  );

  public deleteAuthor = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const authorId = request.params.id;
      await this.AuthorService.deleteAuthor(authorId);

      response.send('deleted successfully');
    }
  );
}

export default AuthorController;
