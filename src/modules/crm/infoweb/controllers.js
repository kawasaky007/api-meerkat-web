import * as services from './services';

export const createInfoWeb = async (req, res) => {
  try {
    const data = await services.createInfo(req.body);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
