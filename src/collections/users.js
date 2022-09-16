import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { hash, compare } from 'bcrypt';
const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
    default:
      'https://meslab.vn/wp-content/uploads/2019/08/istockphoto-476085198-612x612.jpg',
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    enum: ['model', 'render', 'pts', 'other'],
    default: 'other',
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'collab'],
  },
  code: {
    type: String, //
    default: '',
  },
  isActive: {
    type: Boolean, //
    default: true,
  },
});

Schema.pre('save', async function (next) {
  try {
    if (!this.isModified('password') || !this.password) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

Schema.methods.comparePassword = async function (password) {
  return compare(password, this.password);
};
Schema.plugin(mongoosePaginate);
const User = mongoose.model('users', Schema);

export default User;
