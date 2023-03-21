import Orders from '../../../collections/order'
import Tours from '../../../collections/tours'

const ErrorResponse = require('../../../utils/errorResponse')
import config from '../../../app.config';
import * as cloudinary from '../../../cloudinary.config';

const asyncHandler = require('../../../middlewares/async')
export const createItem = asyncHandler(async (req, res, next) => {
  const data = await Orders.create({ ...req.body });
  res.status(201).json({ data });
});
export const updateItem = asyncHandler(async (req, res, next) => {
  let data = await Orders.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data = await Orders.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(200).json({
    success: true,
    data: data
  })
})

export const getAll = asyncHandler(async (req, res, next) => {
  let data = {};
  let query = {};
  if (req.query.search) query['name'] = { $regex: req.query.search, $options: 'i' };
  if (req.query.tourId) query['tourId'] = req.query.tourId;

  data = await Orders.paginate(
    { ...query },
    {
      ...config.app.paginate_options,
      ...req.query,
      populate: {
        path: 'tourId',
        select: ['name'],

      }
     
    },
  )


  res.status(200).json({
    success: true,
    data: data
  })
})
export const getDetailById = asyncHandler(async (req, res, next) => {
  let data = await Orders.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  res.status(200).json({
    success: true,
    data: data
  })
})
export const deleteItem = asyncHandler(async (req, res, next) => {
  // const item = await TypeTourism.findById(req.params.id);
  let item = await Orders.findById(req.params.id)
  if (!item) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  item.delete();
  res.status(200).json({
    success: true,
  })
})