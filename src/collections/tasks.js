import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owners: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Number,
    required: true,
  },
  timeline: {
    type: String,
  },
  tab: {
    type: String,
    enum: ['render', 'model', 'pts', 'done', 'delivered'],
  },
  position: {
    type: {
      tab: {
        type: String,
        enum: ['render', 'model', 'pts', 'done', 'delivered'],
      },
      key: {
        type: Number,
      },
    },
  },
  notes: [
    {
      createdAt: {
        type: Number,
      },
      createdBy: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

const Product = mongoose.model('tasks', Schema);

export default Product;
