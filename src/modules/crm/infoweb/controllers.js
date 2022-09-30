import * as services from './services';
export const createInfoWeb = async (req, res,next) => {
  try {
    const data= await services.createInfo(req.body)
     res.status(201).json( {data} );
  } catch (err) {
    console.log(err);
      next(err) 
  }
};
export const uploadInfoWeb = async (req, res,next) => {
  try {
    const data= await services.updateInfo(req.body)
     res.status(200).json( {data} );
  } 
  catch (err) {
    console.log(err);
      next(err) 
  }
};
export const getDetailActive=async (req,res,next)=>{
  try{
    const data = await services.getInfoActive();
    res.status(200).json({data:data});
  }
  catch(err){
    console.log(err);
    next()
  }
}
export const deleteItem=async (req,res,next)=>{
  try{
     await services.deleteInfo(req.params.id);
    res.status(200).json({success: true});
  }
  catch(err){
    console.log(err);
    next()
  }
}