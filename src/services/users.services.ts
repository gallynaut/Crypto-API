import UsersDao from '../dao/users.dao';
import User from '../models/users.model';
import APIResponse from '../models/apiResponse.interface';

class UsersService {
  private static instance: UsersService;

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  createUser = async (user: User) => {
    const userReturn = await UsersDao.addUser(user);
    let resp: APIResponse;

    if (userReturn) {
      resp = {
        error: false,
        message: `Successfully created new user with ID ${userReturn.id}`,
        data: userReturn,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to create user for ${user.email}`,
        data: userReturn,
      };
    }
    return resp;
  };

  readById = async (userID: number) => {
    const userReturn = await UsersDao.getUserById(userID);
    let resp: APIResponse;

    if (userReturn && userID === userReturn.id) {
      resp = {
        error: false,
        message: `Successfully found user with ID ${userID}`,
        data: userReturn,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to find user ${userID}`,
      };
    }
    return resp;
  };

  readByEmail = async (email: string) => {
    const selectReturn = await UsersDao.getUserByEmail(email);
    let resp: APIResponse;

    if (selectReturn) {
      resp = {
        error: false,
        message: `Successfully found user with email ${email}`,
        data: selectReturn,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to find user with email ${email}`,
      };
    }
    return resp;
  };

  updateById = async (user: User) => {
    const updateReturn = await UsersDao.putUserById(user);
    let resp: APIResponse;

    if (updateReturn && user.email === updateReturn.email) {
      resp = {
        error: false,
        message: `Successfully updated user with ID ${user.id}`,
        data: updateReturn,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to update user ${user.id}`,
      };
    }
    return resp;
  };

  // Not sure it makes sense to delete users with this project
  deleteById = async (id: number) => {
    const deleteReturn = await UsersDao.removeUserById(id);
    let resp: APIResponse;

    if (deleteReturn) {
      resp = {
        error: false,
        message: `Successfully deleted user with ID ${id}`,
        data: deleteReturn,
      };
    } else {
      resp = {
        error: true,
        message: `Failed to delete user ${id}`,
      };
    }
    return resp;
  };

  checkEmailValidity = (email: string) => {
    if (!email || !email.includes('@')) {
      return false;
    }
    return true;
  };
}

export default UsersService.getInstance();
