import * as services from './services';

export const createAccountForCustomer = async (req, res) => {
  try {
    const data = await services.createAccountForCustomer(req.body);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createAccountCustomers = async (req, res) => {
  try {
    const data = await services.createAccountByList(req.body.list);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAllCustomer = async (req, res) => {
  try {
    const data = await services.getAllCustomer(req.query);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const data = await services.updateCustomer(req.params.id, req.body);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getDetailCustomer = async (req, res) => {
  try {
    const data = await services.getDetailCustomer(req.params.id);

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
