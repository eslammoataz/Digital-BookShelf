

import BookModel from '../Book/book.model';
import CategoryModel from './categories.model';


class CategoryService {
    private Books = BookModel;
    private Category = CategoryModel;

    public getAllCategories = () => {
        const categories = this.Category.findAll({
            include: this.Books
        });
        return categories;
    }

    public getBooksByCategoryId = (async (categoryId) => {
        const books = await this.Books.findAll({
            where: { categoryId: categoryId },
        })
        return books;
    })


    public createCategory = async (CategoryData: any) => {
        return await this.Category.create(CategoryData)
    }

    public deleteCategory = async (id) => {
        const deleteCategory = await this.Category.destroy({
            where: {
                id: id
            }
        });

        return deleteCategory;
    }
    public updateCategory = async (id, updateData) => {
        const updateCategory = await this.Category.update(updateData, {
            where: {
                id: id
            }
        })
        return updateCategory;
    }
}

export default CategoryService;