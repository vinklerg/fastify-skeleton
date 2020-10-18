import { UserModel } from './user.model';
import { User } from './user';

export interface UserRepository {
  getUserByID(id: User['id']): Promise<User | null>;
}

export const userTransformer = (userModel: UserModel): User => ({
  id: userModel.id,
  createdAt: userModel.createdAt,
  updatedAt: userModel.updatedAt,
  name: userModel.name,
  email: userModel.email,
});

export const userRepositoryFactory = (): UserRepository => {
  const getUserByID = async (id: User['id']): Promise<User | null> => {
    const selectedUser = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!selectedUser) {
      return null;
    }
    return userTransformer(selectedUser);
  };

  return {
    getUserByID,
  };
};
