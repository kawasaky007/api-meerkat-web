import InfoWeb from '../../../collections/info-web'
const ErrorResponse = require('../../../utils/errorResponse')
const asyncHandler = require('../../../middlewares/async')
export const createInfoWeb = asyncHandler(async (req, res, next) => {
  const data = await  InfoWeb.create({ ...req.body });
    res.status(201).json({ data });
});
export const uploadInfoWeb = asyncHandler(async (req, res, next) => {
  let data = await InfoWeb.findOne({active:true})
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data = await InfoWeb.findOneAndUpdate({ active: true }, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: data
  })
})

export const getDetailActive = asyncHandler(async (req, res, next) => {
  const data = await InfoWeb.findOne({ active: true })
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  res.status(200).json({
    success: true,
    data: data
  })
})

export const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await InfoWeb.findById(req.params.id);
  item.delete();
  res.status(200).json({
    success: true,
  })
})