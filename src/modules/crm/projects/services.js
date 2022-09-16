import Project from '../../../collections/projects';
import config from '../../../app.config';
import moment from 'moment';
import Customer from '../../../collections/customers';

export const create = async ({
  type,
  kind,
  require,
  price,
  customer,
  staffModel,
  staffRender,
  staffPTS,
  manager,
  level,
}) => {
  const start = moment().startOf('month');
  const end = moment().endOf('month');
  const owner = await Customer.findById(customer);
  const counter = await Project.countDocuments({
    customer,
    startAt: { $lte: end, $gte: start },
  });
  const data = await Project.create({
    type,
    kind,
    require,
    price,
    customer,
    staffModel,
    staffRender,
    staffPTS,
    manager,
    level,
    startAt: new Date().getTime(),
  });
  data.code = `${owner.code}_${counter + 1}.${moment().format('MM.YY')}`;
  data.save();
  return data;
};

export const getAllProject = async (filter) => {
  let options = {};
  if (filter.search) options['code'] = { $regex: filter.search, $options: 'i' };
  if (filter.level) options['level'] = filter.level;
  const data = await Project.paginate(
    { ...options },
    {
      ...config.app.paginate_options,
      ...filter,
      populate: 'staffModel staffRender staffPTS manager customer',
    }
  );
  return data;
};

export const updateProcess = async (projectId, staffId, step, media) => {
  const currentProject = await Project.findById(projectId);
  if (step === 'model') {
    if (
      currentProject.staffModel.toString() != staffId.toString() ||
      currentProject.manager.toString() != staffId.toString()
    )
      throw new Error('Bạn không có quyền');
    currentProject.process = 'model';
  }
  if (step === 'render') {
    if (
      currentProject.staffRender.toString() != staffId.toString() ||
      currentProject.manager.toString() != staffId.toString()
    )
      throw new Error('Bạn không có quyền');
    currentProject.process = 'render';
  }
  if (step === 'pts') {
    if (
      currentProject.staffPTS.toString() != staffId.toString() ||
      currentProject.manager.toString() != staffId.toString()
    )
      throw new Error('Bạn không có quyền');
    currentProject.process = 'pts';
  }
  currentProject.media = [...currentProject.media, media];
  currentProject.save();

  return true;
};

export const confirmCompleteOrStart = async (projectId, staffId, status) => {
  const currentProject = await Project.findById(projectId);
  if (staffId.toString() != currentProject.manager.toString())
    throw new Error('Bạn không có quyền');
  currentProject.status = status;
  if (status === 'done') currentProject.endAt = new Date().getTime();
  else currentProject.startAt = new Date().getTime();

  currentProject.save();
  return true;
};

export const updateNote = async (projectId, note) => {
  const currentProject = await Project.findById(projectId);
  currentProject.note = [
    ...currentProject.note,
    {
      detail: note.detail,
      createdBy: note.createdBy,
      createdAt: new Date().getTime(),
    },
  ];
  currentProject.save();
  return true;
};

export const getDetailProject = async (projectId) => {
  const data = await Project.findById(projectId);
  return data;
};

export const staffGetOwnedProject = async (staffId) => {
  const projects = await Project.find();
  const data = projects.filter(
    (item) =>
      item.staffModel.toString() === staffId.toString() ||
      item.staffRender.toString() === staffId.toString() ||
      item.staffPTS.toString() === staffId.toString() ||
      item.manager.toString() === staffId.toString()
  );
  return data;
};



export const addTag = async (projectId, newTag) => {
  const data = await Project.findById(projectId);
  data.tag = [
    ...data.tag,
    { description: newTag.description, color: newTag.color },
  ];
  data.save();
  return true;
};
export const removeTag = async (projectId, tagId) => {
  const data = await Project.findById(projectId);
  const removed = data.tag.filter((item) => item._id != tagId);
  data.tag = removed;
  data.save();
  return true;
};
