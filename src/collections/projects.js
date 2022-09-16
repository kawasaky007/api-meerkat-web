import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  type: {
    type: String,
    enum: ['fix', 'new'],
    require: true,
  },
  kind: {
    type: String, //
    enum: ['town', 'garden', 'other'],
  },
  require: {
    type: String, //
    enum: ['onday', 'need', 'other'],
  },
  status: {
    type: String,
    enum: ['prepare', 'start', 'done', 'deliveried'],
    require: true,
    default: 'prepare',
  },
  price: {
    type: Number,
    default: 0,
  },
  process: {
    type: String,
    enum: ['model', 'render', 'pts', 'fixing'],
    default: 'model',
  },
  fixingNote: {
    type: String,
    require: false,
  },
  startAt: {
    type: Number,
  },
  endAt: {
    type: Number,
  },
  media: [
    {
      step: String,
      url: String,
    },
  ],
  staffModel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  staffRender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  staffPTS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  note: [
    {
      detail: String,
      createdBy: mongoose.Schema.Types.ObjectId,
      createdAt: Number,
    },
  ],
  feedback: {
    type: String,
  },
  timesFixed: {
    type: Number,
  },
  tag: [{ description: String, color: '' }],
  level: {
    type: String,
    enum: ['easy', 'hard', 'medium'],
    default: 'easy',
  },
});

Schema.plugin(mongoosePaginate);
const Payment = mongoose.model('projects', Schema);

export default Payment;
