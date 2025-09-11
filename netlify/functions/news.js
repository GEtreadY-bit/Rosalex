const postgres = require('postgres');

// Reuse connection across invocations when possible
let sql;
function getSql() {
  if (!sql) sql = postgres(process.env.DATABASE_URL);
  return sql;
}

exports.handler = async function (event) {
  const method = event.httpMethod;
  const sql = getSql();
  try {
    if (method === 'GET') {
      const news = await sql`SELECT * FROM "News" ORDER BY date DESC`;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      };
    }

    // Only GET implemented in this function. Other methods should be handled by a separate admin-authorized function.
    return {
      statusCode: 405,
      headers: { Allow: 'GET' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (err) {
    console.error('news function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};
