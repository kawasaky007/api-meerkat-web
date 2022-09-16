import * as services from './services';

export const create = async (req, res) => {
  try {
    const data = await services.create(req.body.name);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await services.updateProduct(req.params._id, req.body);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await services.deleteProduct(req.params._id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await services.getAll();
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
