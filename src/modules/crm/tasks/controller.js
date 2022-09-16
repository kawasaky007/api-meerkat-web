import * as service from './service';

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
