import TypeTourism from '../../../collections/type-tourism'
const ErrorResponse = require('../../../utils/errorResponse')
const asyncHandler = require('../../../middlewares/async')
export const createTypeTourism = asyncHandler(async (req, res, next) => {
  const data = await  TypeTourism.create({ ...req.body });
    res.status(201).json({ data });
});
export const updateTypeTourism = asyncHandler(async (req, res, next) => {
  let data = await TypeTourism.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data =await TypeTourism.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(200).json({
    success: true,
    data: data
  })
})

export const getAllTypeTourism = asyncHandler(async (req, res, next) => {
  const data = await TypeTourism.find();
 
  res.status(200).json({
    success: true,
    data: data
  })
})
export const getDetailById= asyncHandler(async (req,res,next)=>{
  let data = await TypeTourism.findById(req.params.id)
  if (!data) {
    return next(new ErrorResponse(`Không tìm thấy thông tin`, 404))
  }
  data =await TypeTourism.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(200).json({
    success: true,
    data: data
  })
})
export const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await TypeTourism.findById(req.params.id);
  item.delete();
  res.status(200).json({
    success: true,
  })
})