import * as services from './services';

export const getAllStaff = async (req, res) => {
  try {
    const data = await services.getAllStaff(req.query);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const toggleStatusStaff = async (req, res) => {
  try {
    await services.toggleStatusStaff(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateStaffInfo = async (req, res) => {
  try {
    await services.updateStaffInfo(req.params.id, req.body);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getDetailStaff = async (req, res) => {
  try {
    const data = await services.getDetailStaff(req.params.id);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const suggestJobs = async (req, res) => {
  try {
    const data = await services.suggestJobs();
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
