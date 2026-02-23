const { QueryLog, User, DBConnection } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
  try {
    const org_id = req.user.org_id;
    
    // We need users of this org
    const orgUsers = await User.findAll({ where: { org_id }, attributes: ['id'] });
    const userIds = orgUsers.map(u => u.id);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Queries Today
    const queriesToday = await QueryLog.count({
      where: {
        user_id: { [Op.in]: userIds },
        createdAt: { [Op.gte]: todayStart }
      }
    });

    // Total Queries
    const totalQueries = await QueryLog.count({
      where: { user_id: { [Op.in]: userIds } }
    });

    // Average Execution Time
    const avgExecutionTime = await QueryLog.aggregate('execution_time', 'avg', {
      where: { user_id: { [Op.in]: userIds }, status: 'success' }
    });

    res.json({
      queriesToday,
      totalQueries,
      avgExecutionTime: Math.round(avgExecutionTime || 0),
      modelLatency: 1500, // Mocked for prototype
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

const getQueryHistory = async (req, res) => {
  try {
    const org_id = req.user.org_id;
    const orgUsers = await User.findAll({ where: { org_id }, attributes: ['id'] });
    const userIds = orgUsers.map(u => u.id);

    const history = await QueryLog.findAll({
      where: { user_id: { [Op.in]: userIds } },
      order: [['createdAt', 'DESC']],
      limit: 50,
      include: [
        { model: User, attributes: ['email'] }
      ]
    });

    res.json(history);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch query history' });
  }
};

module.exports = { getDashboardStats, getQueryHistory };
