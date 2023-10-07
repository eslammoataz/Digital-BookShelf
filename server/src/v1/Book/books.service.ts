import db from '../../DBConfig';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import BookModel from './book.model';
import CategoryModel from '../categories/categories.model';
import TagModel from '../tags/tags.model';
import Book from './book.interface';
import { create } from 'domain';
import AuthorModel from '../Author/author.model';
import { parse } from 'path';
import AuthorService from './../Author/author.service';
import AuthorNotFound from '../exceptions/AuthorNotFound';

class BookService {
  private Books = BookModel;
  private Category = CategoryModel;
  private tags = TagModel;
  private Author = AuthorModel;
  private AuthorService = new AuthorService();

  public getAllBooks = (page: number) => {
    const booksPerPage = 20;
    const offset = (page - 1) * booksPerPage;
    const books = this.Books.findAll({
      include: [
        {
          model: this.Category,
          attributes: ['name'],
        },
      ],
      limit: booksPerPage,
      offset: offset,
    });
    return books;
  };

  public getBooksBySearch = async (searchWord: String, page: number) => {
    const booksPerPage = 20;
    const offset = (page - 1) * booksPerPage;
    const books = await this.Books.findAll({
      where: {
        name: { [Op.like]: `%${searchWord}%` },
      },
    });
    return books;
  };

  public getBookById = async (bookId) => {
    const book = await this.Books.findOne({
      where: { id: bookId },
      include: [
        {
          model: this.Category,
          attributes: ['name'],
        },
      ],
    });
    const tags = await book.getTags({ attributes: ['name'] });
    const tagNames = tags.map((tag) => tag.name);
    return { book, tagNames };
  };

  public createBook = async (BookData: any, tagNames: any) => {
    const authorId = parseInt(BookData.authorId);
    const author = await this.AuthorService.getAuthor(authorId);

    const createdProject = this.Books.create({ ...BookData });

    const tags = Promise.all(
      tagNames.map((name) => this.tags.findOrCreate({ where: { name } }))
    );
    const data = await Promise.all([createdProject, tags]);
    const tagIds = data[1].map((tag) => tag[0].id);
    await Promise.all([tagIds.forEach((tagId) => data[0].setTags(tagId))]);

    //setting author and book in the authoor_books table
    (await createdProject).setAuthors(author.id);

    return createdProject;
  };

  public deleteBook = async (id) => {
    const deleteBook = await this.Books.destroy({
      where: {
        id: id,
      },
    });

    return deleteBook;
  };
  public updateBook = async (id, updateData) => {
    const updateBook = await this.Books.update(updateData, {
      where: {
        id: id,
      },
    });
    return updateBook;
  };
}

export default BookService;
