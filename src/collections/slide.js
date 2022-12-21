import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({
index:{
    type:String,
},

  thumbnail: {
    url: {
      type: String,
      required: "Không để trống hình ảnh",
    }
  }
})

Schema.pre('save', function (next) {
    Slide.find().count((err,count)=>{
        this.index=count;
    })
    next();
  });
Schema.plugin(mongoosePaginate);
const Slide = mongoose.model('slides', Schema);
export default Slide;
