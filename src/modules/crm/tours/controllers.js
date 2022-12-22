import Tours from '../../../collections/tours'
import config from '../../../app.config';
import * as cloudinary from '../../../cloudinary.config';

const ErrorResponse = require('../../../utils/errorResponse')
const asyncHandler = require('../../../middlewares/async')
export const createItem = asyncHandler(async (req, res, next) => {
  const data = await Tours.create({ ...req.body });
  res.status(201).json({ data });
});


export const getAll = asyncHandler(async (req, res, next) => {
  let data = {};
  let query = {};
  if (req.query.search) query['name'] = { $regex: req.query.search, $options: 'i' };
  if (req.query.typeTourismId) query['typeTourismId'] = req.query.typeTourismId;

  data = await Tours.paginate(
    { ...query },
    {
      ...config.app.paginate_options,
      ...req.query
    }
  );

  res.status(200).json({
    success: true,
    data: data
  })
})
export const getDetailById = asyncHandler(async (req, res, next) => {
  let data = await Tours.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data = await Tours.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(200).json({
    success: true,
    data: data
  })
})
export const updateItem = asyncHandler(async (req, res, next) => {
  let data = await Tours.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data = await Tours.findByIdAndUpdate(req.params.id, { ...req.body });
  if (data.thumbnail.url) {
    if (data.thumbnail.url !== req.body.thumbnail.url) {
      await cloudinary.deleteImage(data.thumbnail.url)

    }
  }
  res.status(200).json({
    success: true,
    data: data
  })
})
export const deleteItem = asyncHandler(async (req, res, next) => {
  if (item.thumbnail.url)
    await cloudinary.deleteImage(item.thumbnail.url)
  const item = await Tours.findById(req.params.id);
  item.delete();
  res.status(200).json({
    success: true,
  })
})