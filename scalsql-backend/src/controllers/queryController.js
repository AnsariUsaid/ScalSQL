const { createInstitutionConnection } = require('../config/database');
const { generateSQL } = require('../services/sagemakerService');
const { validateSQL } = require('../utils/sqlValidator');
const { connectionStore } = require('./configController');

const generateQuery = async (req, res) => {
  try {
    const { question, connection_id } = req.body;
    
    if (!question || !connection_id) {
      return res.status(400).json({ error: 'Question and connection_id are required' });
    }

    const connection = connectionStore.get(String(connection_id));
    if (!connection) {
      return res.status(404).json({ error: 'Database connection not found' });
    }

    const schema_cache = connection.schema_cache;
    
    // Call SageMaker stub to generate SQL
    const generatedSQL = await generateSQL(question, schema_cache);

    // Validate AST (Only SELECT allowed)
    const validation = validateSQL(generatedSQL);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error, generatedSQL });
    }

    res.json({ sql: generatedSQL, status: 'validated' });

  } catch (error) {
    console.error('Generate query error:', error);
    res.status(500).json({ error: 'Failed to generate query' });
  }
};

const executeQuery = async (req, res) => {
  try {
    const { sql, question, connection_id } = req.body;

    if (!sql || !connection_id) {
      return res.status(400).json({ error: 'SQL and connection_id are required' });
    }

    // Double-check validation before execution
    const validation = validateSQL(sql);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    const connectionInfo = connectionStore.get(String(connection_id));
    if (!connectionInfo) return res.status(404).json({ error: 'Connection not found' });

    // Create a temporary Sequelize connection
    const tempSequelize = createInstitutionConnection({
      dialect: connectionInfo.dialect,
      host: connectionInfo.host,
      port: connectionInfo.port,
      database: connectionInfo.db_name,
      username: connectionInfo.username,
      password: connectionInfo.password,
    });

    const startTime = Date.now();
    let result = [];
    let queryStatus = 'pending';
    let errorMessage = null;

    try {
      [result] = await tempSequelize.query(sql);
      queryStatus = 'success';
    } catch (dbError) {
      queryStatus = 'error';
      errorMessage = dbError.message;
    }

    const executionTime = Date.now() - startTime;
    await tempSequelize.close();

    if (queryStatus === 'error') {
      return res.status(400).json({ error: 'Database Execution Error', details: errorMessage });
    }

    res.json({
      data: result,
      execution_time: executionTime,
      status: queryStatus
    });

  } catch (error) {
    console.error('Execute query error:', error);
    res.status(500).json({ error: 'Failed to execute query' });
  }
};

module.exports = { generateQuery, executeQuery };
