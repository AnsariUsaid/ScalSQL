const { createInstitutionConnection } = require('../config/database');

// In-memory store for demo — no Core DB required
const connectionStore = new Map();
let nextId = 1;

const saveConnection = async (req, res) => {
  try {
    const { name, dialect, host, port, db_name, username, password } = req.body;

    if (!name || !dialect || !host || !port || !db_name || !username || !password) {
      return res.status(400).json({ error: 'Missing required connection parameters' });
    }

    // 1. Test the connection first
    const tempSequelize = createInstitutionConnection({ dialect, host, port, database: db_name, username, password });
    await tempSequelize.authenticate();

    // 2. Extract schema
    let schema_cache = {};
    if (dialect === 'postgres') {
      const tablesInfo = await tempSequelize.query(
        "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public'"
      );
      tablesInfo[0].forEach(row => {
        if (!schema_cache[row.table_name]) schema_cache[row.table_name] = [];
        schema_cache[row.table_name].push({ column: row.column_name, type: row.data_type });
      });
    }

    await tempSequelize.close();

    // 3. Save to in-memory store (with plain credentials for demo)
    const id = String(nextId++);
    const conn = { id, name, dialect, host, port, db_name, username, password, schema_cache, createdAt: new Date() };
    connectionStore.set(id, conn);

    res.status(201).json({
      message: 'Connection saved successfully',
      connection: { id, name, db_name, schema: Object.keys(schema_cache) }
    });

  } catch (error) {
    console.error('Save connection error:', error);
    res.status(500).json({ error: 'Failed to connect or save database. ' + error.message });
  }
};

const getConnections = async (req, res) => {
  const connections = Array.from(connectionStore.values()).map(c => ({
    id: c.id,
    name: c.name,
    dialect: c.dialect,
    host: c.host,
    db_name: c.db_name,
    createdAt: c.createdAt
  }));
  res.json(connections);
};

// Export store so queryController can use it
module.exports = { saveConnection, getConnections, connectionStore };
