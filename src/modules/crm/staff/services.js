import Project from '../../../collections/projects';
import User from '../../../collections/users';
import _ from 'lodash';
import config from '../../../app.config';
import moment from 'moment';
// admin role errors

export const getAllStaff = async (filter) => {
  let data = {};
  let query = {};
  if (filter.code) query['code'] = { $regex: filter.code, $options: 'i' };
  if (filter.type) query['type'] = filter.type;
  data = await User.paginate(
    { $or: [{ role: 'staff' }, { role: 'collab' }], ...query },
    { ...config.app.paginate_options, ...filter }
  );
  return data;
};

export const toggleStatusStaff = async (staffId) => {
  const currentStaff = await User.findById(staffId);
  currentStaff.isActive = !currentStaff.isActive;
  currentStaff.save();
  return true;
};

export const updateStaffInfo = async (staffId, payload) => {
  if (payload['code']) {
    const checkIsExisted = await User.findOne({ code: payload['code'] });

    if (checkIsExisted && staffId.toString() != checkIsExisted._id.toString())
      throw new Error('Mã nhân viên đã tồn tại.');
  }
  await User.findByIdAndUpdate(staffId, payload);
  return true;
};

export const getDetailStaff = async (staffId) => {
  const listProject = await Project.find({
    $or: [
      { staffModel: staffId },
      { staffRender: staffId },
      { staffPTS: staffId },
      { manager: staffId },
    ],
  })
    .populate('customer')
    .populate('staffModel')
    .populate('staffRender')
    .populate('staffPTS')
    .populate('manager');
  const currentStaff = await User.findById(staffId);
  return { infor: currentStaff, projects: listProject };
};

const getStatiscProjectByStaff = async (projects, type) => {
  const staffs = await User.find({ type, isActive: true, role: 'staff' });
  const statistic = staffs.map((item) => {
    const ownedProject = projects.filter(
      (project) =>
        project.staffModel.toString() == item._id ||
        project.staffRender.toString() == item._id ||
        project.staffPTS.toString() == item._id ||
        project.manager.toString() == item._id
    );
    return { staff: item, counterProject: ownedProject.length };
  });
  return statistic;
};

export const suggestJobs = async () => {
  const startMonth = moment().startOf('month').toDate().getTime();
  const endMonth = moment().endOf('month').toDate().getTime();
  const totalProject = await Project.find({
    startAt: { $gte: startMonth, $lte: endMonth },
  });
  const models = await getStatiscProjectByStaff(totalProject, 'model');
  const renders = await getStatiscProjectByStaff(totalProject, 'render');
  const pts = await getStatiscProjectByStaff(totalProject, 'pts');

  const staffModelSorted = _.sortBy(models, 'couterProject');
  const staffRenderSorted = _.sortBy(renders, 'couterProject');
  const staffPTSSorted = _.sortBy(pts, 'couterProject');

  return {
    staffModel: staffModelSorted[0].staff,
    staffRender: staffRenderSorted[0].staff,
    staffPTS: staffPTSSorted[0].staff,
  };
};
