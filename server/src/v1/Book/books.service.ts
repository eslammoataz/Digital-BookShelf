
import db from '../../DBConfig';
import { QueryTypes, Sequelize } from 'sequelize';
import BookModel from './book.model';
import CategoryModel from '../categories/categories.model';
import TagModel from '../categories/categories.model';
import Book from './book.interface';

class BookService {
    private Books = BookModel;
    private Category = CategoryModel;

    public getAllBooks = () => {
        const books = this.Books.findAll({
            include: [{
                model: this.Category,
                attributes: ['name']
            }]
        });
        return books;
    }

    public getBookById = (async (bookId) => {
        return this.Books.findOne({
            where: { id: bookId },
            include: [{
                model: this.Category,
                attributes: ['name']
            }]
        })
    })


    public createBook = async (BookData: any) => {
        return await this.Books.create(BookData)
    }

    public deleteBook = async (id) => {
        const deleteBook = await this.Books.destroy({
            where: {
                id: id
            }
        });

        return deleteBook;
    }
    public updateBook = async (id, updateData) => {
        const updateBook = await this.Books.update(updateData, {
            where: {
                id: id
            }
        })
        return updateBook;
    }
}

export default BookService;