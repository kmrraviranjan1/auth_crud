import { UserInterface } from "../interfaces/user.interface";

const User = require("../database/models").tbl_user;

const getAllUser = async (): Promise<UserInterface[]> => {
  const allUsers: UserInterface[] = await User.findAll({
    attributes: ["id","name","contact","email"]
  });

  return allUsers;
};

const getUserById = async (id: String): Promise<UserInterface> => {
  const user: UserInterface = await User.findOne({
    where: {
      id,
    },
    attributes: ["id","name","contact","email"]
  });

  return user;
};

const getUserByEmail = async (email: String): Promise<UserInterface> => {
  const user: UserInterface = await User.findOne({
    where: {
      email,
    },
    attributes: ["id","name","contact","email","password"]
  });

  return user;
};

const createUser = async (rawUser: UserInterface): Promise<UserInterface> => {
  const createdUser: UserInterface = await User.create(rawUser);

  return createdUser;
};

const updateUser = async (
  rawUser: UserInterface,
  id: String
): Promise<Boolean> => {
  const isUserUpdated = await User.update(rawUser, {
    where: { id },
  });

  return Boolean(isUserUpdated[0]);
};

export { getAllUser, getUserById, getUserByEmail, createUser, updateUser };
