import * as services from './services';

export const create = async (req, res) => {
  try {
    const data = await services.create(req.body);
    return res.status(201).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const data = await services.getAllProject(req.query);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const staffUpdateProcess = async (req, res) => {
  try {
    const { step, media } = req.body;
    await services.updateProcess(req.params.projectId, req.user, step, media);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const managerConfirmCompleteOrStart = async (req, res) => {
  try {
    const { status } = req.body;
    await services.confirmCompleteOrStart(
      req.params.projectId,
      req.user,
      status
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const anyoneUpdateNote = async (req, res) => {
  try {
    const data = await services.updateNote(req.params.projectId, req.body.note);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getDetailProject = async (req, res) => {
  try {
    const data = await services.getDetailProject(req.params.projectId);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const staffGetOwnedProject = async (req, res) => {
  try {
    const data = await services.staffGetOwnedProject(req.user);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const addTag = async (req, res) => {
  try {
    const data = await services.addTag(req.params.projectId, req.body);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const removeTag = async (req, res) => {
  try {
    const data = await services.removeTag(
      req.params.projectId,
      req.query.tagId
    );
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
