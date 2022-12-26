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
    },
    locationStart: {
        type: String,
        trim: true,
        required: "Không để trống nơi khởi hành",
    },
    locationFinish: {
        type: String,
        trim: true,
        required: "Không để trống nơi đến",
    },
    timeTour: {
        type: String,
        trim: true,
        required: "Không để trống thời gian",
    },
    ageTour: {
        type: String,
        trim: true,
        required: "Không để trống độ tuổi",
    },
    infoTour: {
        type: String,
        required: "Không để trống thông tin tour",
        maxlength: [2500, 'Thông tin tour không được lớn hơn 500 kí tự']


    },
    infoTourShort: {
        type: String,
        required: "Không để trống nội dung",
        maxlength: [500, 'Nội dung không được lớn hơn 200 kí tự']

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reviews: {
        starRating: {
            type: Number,
            min: [1, 'Đánh giá phải lớn hơn 1'],
            max: [5, 'Đánh giá phải nhỏ hơn 5'],
            default: 1
        },
        countReviews: {
            type: Number,
            default: 0

        }
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    newPrice: {
        type: Number,
        default: 0
    },
    tourSchedule: [
        {
            title: {
                type: String
            },
            content: {
                type: String
            }
        }
    ],
    listQuestions: [
        {
            title: {
                type: String
            },
            content: {
                type: String
            }
        }
    ],
    typeTourismId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type-tourism',
    },

})

Schema.pre('save', function (next) {

    const slugTmp = slugify(this.name, {
        lower: true,
        locale: 'vi'
    });
    const checkSlug = Tours.findOne({ slug: slugTmp })
    if (checkSlug) {
        this.slug = slugTmp + '' + (new Date().getTime());
    }
    else {
        this.slug = slugTmp;
    }
    next();
});

Schema.plugin(mongoosePaginate);
const Tours = mongoose.model('tours', Schema);
export default Tours;
