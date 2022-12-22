import TypeTourism from '../../../collections/type-tourism'
const ErrorResponse = require('../../../utils/errorResponse')
import config from '../../../app.config';
import * as cloudinary from '../../../cloudinary.config';

const asyncHandler = require('../../../middlewares/async')
export const createTypeTourism = asyncHandler(async (req, res, next) => {
  const data = await TypeTourism.create({ ...req.body });
  res.status(201).json({ data });
});
export const getAllTypeTourism = asyncHandler(async (req, res, next) => {
  let data = {};
  let query = {};
  if (req.query.search) query['name'] = { $regex: req.query.search, $options: 'i' };

  data = await TypeTourism.paginate(
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
  let data = await TypeTourism.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  res.status(200).json({
    success: true,
    data: data
  })
})
export const updateTypeTourism = asyncHandler(async (req, res, next) => {
  let data = await TypeTourism.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  if (data.thumbnail.url) {
    if (data.thumbnail.url !== req.body.thumbnail.url) {
      await cloudinary.deleteImage(data.thumbnail.url)

    }
  }
  data = await TypeTourism.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(200).json({
    success: true,
    data: data
  })
})
export const deleteItem = asyncHandler(async (req, res, next) => {
  let item = await TypeTourism.findById(req.params.id)
  if (!item) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }

  if (item.thumbnail.url)
    await cloudinary.deleteImage(item.thumbnail.url)
  item.delete();
  res.status(200).json({
    success: true,
  })
})