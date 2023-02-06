import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: "Không để trống họ và tên",
    },
    email:{
        type:String,
        trim:true,
        required:"Không để trống email",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vui lòng nhập đúng định dạng email']
      },
      phone: {
        type: String,
        require: true,
        required:"Không để trống Số điện thoại",
        match: [/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Vui lòng nhập đúng định dạng Số điện thoại']


      },
      dayTime: {
        type: Date,
        require: true,
        required:"Không để trống ngày",


      },
      countTicket:{
        type: Number,
        require: true,
        default: 0,
        required:"Không để trống số vé",
      },
      tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tours',
        require: true,
    },

})


Schema.plugin(mongoosePaginate);
const Orders = mongoose.model('orders', Schema);
export default Orders;
