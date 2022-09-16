import User from '../../../collections/users';
import _ from 'lodash';

export const getProfile = async (_id) => {
  const currentUser = await User.findById(_id);
  return _.pick(currentUser, [
    '_id',
    'name',
    'email',
    'phone',
    'role',
    'code',
    'avatar',
  ]);
};

export const updatePassword = async ({ _id, currentPassword, newPassword }) => {
  if (currentPassword === newPassword)
    throw new Error(`Mật khẩu mới không được trùng với mật khẩu cũ.`);

  const current_user = await User.findById(_id);

  const isValidPassword = await current_user.comparePassword(currentPassword);
  if (!isValidPassword) throw new Error(`Sai mật khẩu.`);

  current_user.password = newPassword;
  await current_user.save();
  return true;
};
