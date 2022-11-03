import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Không để trống tên",
  },
  slug: {
    type: String,
  }, 
  thumbnail: {
    url: {
      type: String,
      required: "Không để trống hình ảnh",
    }
  }
})

// Create bootcamp slug from the name
Schema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    locale: 'vi'
  });
  next();
});
Schema.plugin(mongoosePaginate);
const TypeTourism = mongoose.model('type-tourism', Schema);
export default TypeTourism;
