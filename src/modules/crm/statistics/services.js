import User from '../../../collections/users';
import Customer from '../../../collections/customers';
import Projects from '../../../collections/projects';
import moment from 'moment';




const getStatiscProjectByStaff = async (projects, type, role) => {
  let options = { role };
  if (role == 'staff') options = { ...options, type };
  const staffs = await User.find({ ...options });
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

const getStatisProjectByCustomer = async (projects) => {
  const customers = await Customer.find();
  const statistic = customers.map((item) => {
    const ownedProject = projects.filter(
      (project) => project.customer.toString() == item._id
    );
    const totalCost = ownedProject.reduce((sum, item) => sum + item.price, 0);
    return { customer: item, cost: totalCost };
  });
  return statistic;
};
