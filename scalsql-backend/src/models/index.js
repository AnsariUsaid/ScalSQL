const Organization = require('./Organization');
const User = require('./User');
const QueryLog = require('./QueryLog');
const DBConnection = require('./DBConnection');

// Define Relationships
Organization.hasMany(User, { foreignKey: 'org_id' });
User.belongsTo(Organization, { foreignKey: 'org_id' });

Organization.hasMany(DBConnection, { foreignKey: 'org_id' });
DBConnection.belongsTo(Organization, { foreignKey: 'org_id' });

User.hasMany(QueryLog, { foreignKey: 'user_id' });
QueryLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  Organization,
  User,
  QueryLog,
  DBConnection
};
