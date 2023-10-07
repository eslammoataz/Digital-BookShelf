import BookModel from '../Book/book.model';
import CategoryModel from './categories.model';

class CategoryService {
  private Books = BookModel;
  private Category = CategoryModel;

  public getAllCategories = () => {
    const categories = this.Category.findAll({
      include: this.Books,
    });
    return categories;
  };

  public getBooksByCategoryId = async (categoryId) => {
    const books = await this.Books.findAll({
      where: { categoryId: categoryId },
    });
    return books;
  };

  public createCategory = async (CategoryData: any) => {
    const [category, created] = await this.Category.findOrCreate({
      where: CategoryData,
    });

    return category;
  };

  public deleteCategory = async (id) => {
    const deleteCategory = await this.Category.destroy({
      where: {
        id: id,
      },
    });

    return deleteCategory;
  };

  public updateCategory = async (id, updateData) => {
    await this.Category.update(updateData, {
      where: {
        id: id,
      },
    });

    const afterModification = await this.Category.findByPk(id);

    // console.log(afterModification);

    return afterModification;
  };
}

export default CategoryService;
