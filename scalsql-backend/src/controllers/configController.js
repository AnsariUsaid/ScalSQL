const { DBConnection } = require('../models');
const { encrypt } = require('../utils/encryption');
const { createInstitutionConnection } = require('../config/database');

const saveConnection = async (req, res) => {
  try {
    const { name, dialect, host, port, db_name, username, password } = req.body;
    const org_id = req.user.org_id;

    if (!name || !dialect || !host || !port || !db_name || !username || !password) {
      return res.status(400).json({ error: 'Missing required connection parameters' });
    }

    // 1. Test the connection first
    const tempSequelize = createInstitutionConnection({ dialect, host, port, database: db_name, username, password });
    await tempSequelize.authenticate();

    // 2. Extract schema (Basic prototype schema extraction)
    let schema_cache = {};
    if (dialect === 'postgres') {
      const tablesInfo = await tempSequelize.query(
        "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public'"
      );
      // Group by table
      tablesInfo[0].forEach(row => {
        if (!schema_cache[row.table_name]) schema_cache[row.table_name] = [];
        schema_cache[row.table_name].push({ column: row.column_name, type: row.data_type });
      });
    }

    // 3. Encrypt credentials securely
    const credentials = JSON.stringify({ username, password });
    const encrypted_credentials = encrypt(credentials);

    // 4. Save to Core DB
    const newConnection = await DBConnection.create({
      name, dialect, host, port, db_name, encrypted_credentials, schema_cache, org_id
    });

    res.status(201).json({
      message: 'Connection saved successfully',
      connection: { id: newConnection.id, name, db_name, schema: Object.keys(schema_cache) }
    });

  } catch (error) {
    console.error('Save connection error:', error);
    res.status(500).json({ error: 'Failed to connect or save database. ' + error.message });
  }
};

const getConnections = async (req, res) => {
  try {
    const connections = await DBConnection.findAll({
      where: { org_id: req.user.org_id },
      attributes: ['id', 'name', 'dialect', 'host', 'db_name', 'createdAt']
    });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
};

module.exports = { saveConnection, getConnections };
