import User from '../../../collections/users';
import { generateToken } from '../../../utils/jwt';
import _ from 'lodash';
import config from '../../../app.config';

const SECRET_KEY = config.secret_key;

export const createToken = async (user) => {
  const access_token = await generateToken(user, SECRET_KEY, '7d');
  return access_token;
};

export const createUser = async ({
  name,
  email,
  phone,
  password,
  role,
  code,
}) => {
  const userRecord = await User.findOne({ email }).lean().exec();
  if (userRecord) {
    throw new Error('Email đã được sử dụng. Vui lòng chọn email khác.');
  }
  const checkCodeIsExisted = await User.findOne({ code }).lean().exec();
  if (checkCodeIsExisted) {
    throw new Error('Mã nhân viên đã tồn tại');
  }
  const newUser = User.create({
    name,
    email,
    phone,
    password,
    role,
    code,
  });
  return _.pick(newUser, [
    '_id',
    'email',
    'phone',
    'password',
    'code',
    'role',
    'type',
    'name'
  ]);
};

export const signin = async ({ email, password }) => {
  if(!email||!password){
    throw new Error('Email hoặc mật khẩu không được để trống');
  }
  const existedUser = await User.findOne({ email });
  if (!existedUser) throw new Error('Email hoặc mật khẩu không hợp lệ.');

  const isValidPassword = await existedUser.comparePassword(password);
  if (!isValidPassword) throw new Error('Sai mật khẩu.');

  return _.pick(existedUser, ['_id', 'role', 'email','name']);
};
