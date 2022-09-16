import * as service from './services';

export const getOverviewStatistic = async (req, res) => {
  try {
    const data = await service.statisticOverviewProject(req.query.time);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
