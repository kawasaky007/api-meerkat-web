import * as services from './services';

export const getProfile = async (req, res) => {
  try {
    const data = await services.getProfile(req.user);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const updatePassword = async (req, res) => {
  try {
    await services.updatePassword({
      _id: req.user,
      currentPassword: req.body.password,
      newPassword: req.body.new_password,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
