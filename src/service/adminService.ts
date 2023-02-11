import { hash } from 'bcryptjs';
import AdminUsers, { IAdminUsers } from 'src/models/AdminModel';
import ForgetPassword from 'src/models/ForgetPassword';
import { IAdmin, IForgetPassword } from '../interfaces/interfaces';

export default class AdminService {
  /**
   * Create a Users
   * @param {Object} AdminUsersBody
   * @returns {Promise<Users>}
   */
  static createUsers = async (
    AdminUsersBody: IAdmin,
  ): Promise<IAdminUsers | null | { message: string; success: boolean }> => {
    return await AdminUsers.create(AdminUsersBody).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get all Users
   * @returns {Promise<Users>}
   */
  static getUsers = async (_id: string): Promise<IAdminUsers[] | null> => {
    const Userss = await AdminUsers.find({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
    return Userss;
  };

  /**
   * Get Users by id
   * @param {ObjectId} id
   * @returns {Promise<Users>}
   */
  static getUsersById = async (_id: string): Promise<IAdminUsers | null> => {
    return AdminUsers.findById({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get Users by email
   * @param {string} email
   * @returns {Promise<Users>}
   */
  static getUsersByEmail = async (email: string): Promise<IAdminUsers | null> => {
    return AdminUsers.findOne({ email: email, is_active: true }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get all AdminUsers
   * @returns {Promise<IAdminUsers>}
   */
  static getAdminUsers = async (): Promise<IAdminUsers[] | null | undefined> => {
    const Userss = await AdminUsers.find().catch((error: any) => {
      console.log(error);
      return null;
    });
    return Userss;
  };

  /**
   * Get Users by id
   * @param {ObjectId} id
   * @returns {Promise<IAdminUsers>}
   */
  static getAdminUsersById = async (id: string): Promise<IAdminUsers | null> => {
    return AdminUsers.findById({ _id: id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  //Users_id
  /**
   * Get Users by email
   * @param {string} email
   * @returns {Promise<IAdminUsers>}
   */
  static getAdminUsersByEmail = async (email: string): Promise<IAdminUsers | null> => {
    return AdminUsers.findOne({ email: email, is_active: true }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Update Users by id
   * @param {ObjectId} id
   * @param {Object} updateBody
   * @returns {Promise<Users>}
   */
  static updateUsersById = async (id: string, updateBody: any): Promise<IAdminUsers | null> => {
    const User = await AdminUsers.findByIdAndUpdate(
      { _id: id },
      { updateBody },
      {
        returnOriginal: false,
      },
    );
    if (!User) {
      return null;
    }
    // await Users.save();
    return User;
  };

  /**
   * Delete Users by id
   * @param {ObjectId} UsersId
   * @returns {Promise<Users>}
   */
  static deleteUsersById = async (id: string) => {
    const Users = await this.getAdminUsersById(id).catch((error: any) => {
      console.log(error);
      return null;
    });
    if (!Users) {
      return { message: 'Users not found', success: false };
    }
    // await Users.remove();
    return Users;
  };

  /**
   * Encrypts password
   * @param password string
   * @returns hashed password string or undefined
   */
  static getHashedPassword = async (password: string): Promise<string | undefined> => {
    return await hash(password, 12).catch((err) => {
      console.log('error in Hashed Password!', err);
      return undefined;
    });
  };

  /**
   * Mapped signup data to Object
   * @param AdminUsers AdminUsers
   * @returns mapped object typeof ISignup
   */
  static getMappedForgetPassword = async (
    user: IAdmin,
    verificationCode: string,
  ): Promise<{ email: string; code: string }> => {
    return {
      email: user.email.toLowerCase(),
      code: verificationCode,
    };
  };

  /**
   * Create a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static createForgetpassword = async (ForgetPasswords: IForgetPassword): Promise<ForgetPassword | null> => {
    return await ForgetPassword.create(ForgetPasswords).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static getForgetpassword = async (email: string, code: string): Promise<ForgetPassword | null> => {
    return await ForgetPassword.findOne({ email: email, code: code }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get a ForgetPasswords
   * @param {Object} ForgetPasswords
   * @returns {Promise<ForgetPasswords>}
   */
  static deleteForgetpassword = async (email: string): Promise<ForgetPassword | null> => {
    return await ForgetPassword.remove({ email: email }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
}
