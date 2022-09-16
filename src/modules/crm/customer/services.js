import Customer from '../../../collections/customers';
import _ from 'lodash';
import config from '../../../app.config';

export const createAccountForCustomer = async (payload) => {
  if (!payload['password']) payload['password'] = '123456';
  const isExisted = await Customer.findOne({ phone: payload.phone });
  if (isExisted) throw new Error('Số điện thoại đã được đăng ký');
  const data = await Customer.create(payload);
  const counter = await Customer.countDocuments();
  data.code = counter;
  data.save();
  return data;
};

export const updateCustomer = async (customerId, payload) => {
  await Customer.findByIdAndUpdate(customerId, payload);
  return true;
};

export const getAllCustomer = async (filter) => {
  let data = {};
  let query = {};
  if (filter.search) query['phone'] = { $regex: filter.search, $options: 'i' };
  data = await Customer.paginate(
    { ...query },
    { ...config.app.paginate_options, ...filter }
  );
  return data;
};

export const createAccountByList = async (listCustomer) => {
  await Promise.all(listCustomer.map((item) => createAccountForCustomer(item)));
  return true;
};

export const getDetailCustomer = async (customerId) => {
  const data = await Customer.findById(customerId);
  return data;
};
