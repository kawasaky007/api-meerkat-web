import * as service from './services';

export const signup = async (req, res) => {
  try {
    const { can_active } = await service.createUser({ ...req.body });
    return res.status(201).json({ success: true, can_active });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await service.signin({ ...req.body });
    const token = await service.createToken({
      _id: user._id,
      role: user.role,
    
    });
    return res
      .status(200)
      .json({ success: true, access_token: token, info:{
        role: user.role,
        name:user.name,
        email:user.email
      } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
