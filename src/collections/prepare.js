import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({

name:{
    type: String, 
    required: "Không để trống tên",
},
  thumbnail: {
    url: {
      type: String,
      required: "Không để trống hình ảnh",
    }
  }
})
Schema.plugin(mongoosePaginate);
const Prepare = mongoose.model('prepare', Schema);
export default Prepare;
