import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    unique: [true,'Không thể trùng tên'],
    required: "Không để trống tên",
    

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
    match: [/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Vui lòng nhập đúng định dạng Số điện thoại']

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
  arrayService:[
    {
      name:String,
      content:String,
      image:String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  },

});
Schema.plugin(mongoosePaginate);
const InfoWeb = mongoose.model('infoWeb', Schema);

export default InfoWeb;
