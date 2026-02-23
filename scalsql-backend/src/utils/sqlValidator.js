const { Parser } = require('node-sql-parser');
const parser = new Parser();

const validateSQL = (sql) => {
  try {
    // Parse the SQL into an AST
    // Assuming mostly Postgres or generic SQL syntax for prototype
    const ast = parser.astify(sql, { database: 'postgresql' });
    
    // Check if ast is an array (multiple statements) or single object
    const statements = Array.isArray(ast) ? ast : [ast];

    for (let stmt of statements) {
      // We explicitly only allow SELECT statements
      if (stmt.type !== 'select') {
        return {
          isValid: false,
          error: `Disallowed SQL operation detected: ${stmt.type.toUpperCase()}`
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: `SQL Parse Error: ${error.message}`
    };
  }
};

module.exports = { validateSQL };
