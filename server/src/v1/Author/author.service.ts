import { where } from 'sequelize';
import UserModel from '../users/user.model';
import * as bcrypt from 'bcrypt';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import authorModel from '../Author/author.model';
import userModel from '../users/user.model';
import userService from '../users/user.service';
import UserWithThatEMailNotFound from '../exceptions/userNotFoundException';
import AuthorAlreadyExists from '../exceptions/AuthorAlreadyExists';
import AuthorNotFound from '../exceptions/AuthorNotFound';
import AuthorData from './author.interface';
import Book from '../Book/book.interface';

class AuthorService {
  private User = userModel;
  private Author = authorModel;

  public getAllAuthors = async () => {
    const authors = await this.Author.findAll();
    return authors;
  };

  public addAuthor = async (authorEmail: string) => {
    const authorUser = await this.User.findOne({
      where: { email: authorEmail },
    });

    if (!authorUser) {
      throw new UserWithThatEMailNotFound(authorEmail);
    }

    const authorExits = await this.Author.findOne({
      where: { userId: authorUser.id },
    });

    if (authorExits) {
      throw new AuthorAlreadyExists(authorEmail);
    }

    const author = await this.Author.create({
      name: authorUser.name,
      userId: authorUser.id,
    });

    return author;
  };

  public deleteAuthor = async (id: string) => {
    const author = await this.Author.findOne({ where: { id: id } });

    if (author == null) {
      throw new AuthorNotFound(id);
    }
    author.destroy();
    return author;
  };

  public getAuthor = async (id: number) => {
    const author = await this.Author.findOne({
      where: { id: id },
      include: [
        {
          model: this.User,
          attributes: ['email', 'role'],
        },
      ],
      raw: true,
    });

    if (!author) {
      throw new AuthorNotFound(id.toString());
    }

    return author;
  };

  public editAuthor = async (id, authorData: AuthorData) => {
    let author = await this.Author.findOne({
      where: { id: id },
    });

    if (!author) {
      throw new AuthorNotFound(id.toString());
    }

    const updatedAuthor = await this.Author.update(authorData, {
      where: { id: id },
    });

    author = await this.Author.findOne({
      where: { id: id },
    });

    return author;
  };
}

export default AuthorService;
