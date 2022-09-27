import InfoWeb from '../../../collections/info-web'
export const createInfo = async (payload) => {

  const data = await InfoWeb.create(payload);
  return data;
};

// export const updateLesson = async (lessonId, payload) => {
//   const data = await Lesson.findByIdAndUpdate(lessonId, payload);
//   return data;
// };

// export const getAllLessons = async () => {
//   const data = await Lesson.find().select('name _id isShow');
//   return data;
// };

