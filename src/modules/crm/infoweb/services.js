import InfoWeb from '../../../collections/info-web'

export const createInfo = async (payload) => {

  const data= await InfoWeb.create({ ...payload });
  return data;
 
};

export const updateInfo = async (payload) => {
const checkEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
if(!payload.email.match(checkEmail)){
  throw new Error('Vui lòng nhập đúng định dạng Email');

}
const data=  await InfoWeb.findOneAndUpdate({
    active:true
  },{...payload}).exec();


  return data;
 

};
export const getInfoActive=async ()=>{
  return await InfoWeb.findOne({active:true})
}
export const deleteInfo = async (id) => {
  
 const item= await InfoWeb.findById(id);
 item.delete();
  return true;
};

