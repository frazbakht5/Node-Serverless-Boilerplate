import { hash } from 'bcryptjs';
import Users, { IUsers } from 'src/models/UsersModel';
import ForgetPassword from 'src/models/ForgetPassword';
import { IForgetPassword } from '../../interfaces/interfaces';

export default class UserService {
  /**
   * Create a Users
   * @param {Object} UsersBody
   * @returns {Promise<Users>}
   */
  static createUsers = async (UsersBody: IUsers): Promise<IUsers | null> => {
    return await Users.create(UsersBody).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get all Users
   * @returns {Promise<Users>}
   */
  static getUsers = async (_id: string): Promise<IUsers[] | null> => {
    const Userss = await Users.find({ _id }).catch((error: any) => {
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
  static getUsersById = async (_id: string): Promise<IUsers | null> => {
    return await Users.findById({ _id }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Get Users by email
   * @param {string} email
   * @returns {Promise<Users>}
   */
  static getUsersByEmail = async (email: string): Promise<IUsers | null> => {
    return await Users.findOne({ email, is_active: true }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get Users by email
   * @param {string} email
   * @returns {Promise<Users>}
   */
  static getAnyUsersByEmail = async (email: string): Promise<IUsers | null> => {
    return await Users.findOne({ email }).catch((error: any) => {
      console.log(error);
      return null;
    });
  };
  /**
   * Get Users by email
   * @param {string} email
   * @returns {Promise<Users>}
   */
  static getUsersByEmailAuthCode = async (email: string, auth_code: string): Promise<IUsers | null> => {
    return await Users.findOne({ email, auth_code, is_active: true }).catch((error: any) => {
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
  static updateUsersById = async (_id: string, updateBody: any): Promise<IUsers | null> => {
    return await Users.findByIdAndUpdate(
      { _id },
      { $set: updateBody },
      {
        returnOriginal: false,
      },
    ).catch((error) => {
      console.log(error);
      return null;
    });
  };

  /**
   * Delete Users by id
   * @param {ObjectId} UsersId
   * @returns {Promise<Users>}
   */
  static deleteUsersById = async (id: string) => {
    const Users = await this.getUsersById(id).catch((error: any) => {
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
   * @param Users Users
   * @returns mapped object typeof ISignup
   */
  static getMappedForgetPassword = async (
    user: IUsers,
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
