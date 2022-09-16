import Model from '../../../collections/tasks';

export const createTask = async (payload) => {
  const data = await Model.create({
    ...payload,
    createdAt: new Date().getTime(),
  });
  return data;
};

export const updateTask = async (taskId, payload) => {
  await Model.findByIdAndUpdate(taskId, payload);
  return true;
};

export const deleteTask = async (taskId) => {
  await Model.findByIdAndDelete(taskId);
  return true;
};

export const createComment = async (taskId, payload) => {
  const curr = await Model.findById(taskId);
  curr.notes = [...curr.notes, { ...payload, createdAt: new Date().getTime() }];
  curr.save();
  return true;
};

export const deleteCommnent = async (taskId, commentId) => {
  const curr = await Model.findById(taskId);
  curr.notes = curr.notes.filter((item) => item._id.toString() != commentId);
  curr.save();
  return true;
};

export const getAll = async () => {
  const data = await Model.find();
  return data;
};
