import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { hash, compare } from 'bcrypt';

const Schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['personal', 'business'],
  },
  name: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
    default: 0,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  paintBrand: {
    type: String,
    require: true,
  },
  invitedBy: {
    type: String,
    require: false,
  },
  point: {
    type: Number,
    require: true,
    default: 0,
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
const User = mongoose.model('customers', Schema);

export default User;
