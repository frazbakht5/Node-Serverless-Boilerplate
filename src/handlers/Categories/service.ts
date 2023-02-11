import Categories, { ICategories } from 'src/models/VideosCategoriesModel';

export default class CategoriesService {
  /**
   * Create a Categories
   * @param {Object} CategoriesBody
   * @returns {Promise<Categories>}
   */
  static createCategories = async (
    CategoriesBody: ICategories,
  ): Promise<ICategories | null | { message: string; success: boolean }> => {
    return await Categories.create(CategoriesBody).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get all Categories
   * @returns {Promise<Categories>}
   */
  static getAllCategories = async (): Promise<ICategories[] | null> => {
    return await Categories.find().catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get Categories by id
   * @param {ObjectId} id
   * @returns {Promise<Categories>}
   */
  static getCategoriesById = async (_id: string): Promise<ICategories | null> => {
    return Categories.findById({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Update Categories by id
   * @param {ObjectId} id
   * @param {Object} updateBody
   * @returns {Promise<Categories>}
   */
  static updateCategoriesById = async (_id: string, body: ICategories): Promise<ICategories | null> => {
    return await Categories.findByIdAndUpdate(
      { _id },
      { $set: body },
      {
        returnOriginal: false,
      },
    ).catch(() => {
      return null;
    });
  };

  /**
   * Delete Categories by id
   * @param {ObjectId} CategoriesId
   * @returns {Promise<Categories>}
   */
  static deleteCategoriesById = async (id: string): Promise<ICategories | null> => {
    return await Categories.findByIdAndDelete({ _id: id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
}
