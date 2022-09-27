import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { hash, compare } from 'bcrypt';

const Schema = new mongoose.Schema({
 
  name: {
    type: String,
    require: true,
  },
  nameFull:{
    type:String,
    require:true
  },

  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  linkInstagram:{
        link:'',
        active:false
  }
 
  
});
Schema.plugin(mongoosePaginate);
const InfoWeb = mongoose.model('infoWeb', Schema);

export default InfoWeb;
