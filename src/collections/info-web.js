import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    unique: [true,'Không thể trùng tên'],
    required: "Không để trống name",
    

  },
  email:{
    type:String,
    trim:true,
    unique: [true,'Không thể trùng email'],
    required:"Không để trống email",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vui lòng nhập đúng định dạng email']
  },
  active: {
    type: Boolean,
    default: false
  },
  nameFull: {
    type: String,
  },

  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  linkInstagram: {
    link: '',
    active: Boolean,
    default: false

  },
  linkFB: {
    link: '',
    active: Boolean,
    default: false

  },
  linkTikTok: {
    link: '',
    active: Boolean,
    default: false

  },
  linkYoutube: {
    link: '',
    active: Boolean,
    default: false

  },


});
Schema.plugin(mongoosePaginate);
const InfoWeb = mongoose.model('infoWeb', Schema);

export default InfoWeb;
