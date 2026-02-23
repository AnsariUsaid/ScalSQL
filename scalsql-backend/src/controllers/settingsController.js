const { Organization, User } = require('../models');
const bcrypt = require('bcryptjs');

const updateOrgName = async (req, res) => {
  try {
    const { name } = req.body;
    const org_id = req.user.org_id;

    if (!name) return res.status(400).json({ error: 'Organization name is required' });

    await Organization.update({ name }, { where: { id: org_id } });
    res.json({ message: 'Organization name updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update organization name' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user_id = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }

    const user = await User.findByPk(user_id);
    const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validPassword) return res.status(400).json({ error: 'Incorrect current password' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await User.update({ password_hash }, { where: { id: user_id } });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};

module.exports = { updateOrgName, changePassword };
