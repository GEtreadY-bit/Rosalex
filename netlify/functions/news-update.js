const postgres = require('postgres');
const jwt = require('jsonwebtoken');

let sql;
function getSql() {
  if (!sql) sql = postgres(process.env.DATABASE_URL);
  return sql;
}

function verifyTokenFromHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Token ausente');
  const token = authHeader.replace('Bearer ', '');
  const secret = process.env.JWT_SECRET || 'rosalex-secret';
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Token inválido');
  }
}

exports.handler = async function (event) {
  try {
    verifyTokenFromHeader(event.headers.authorization || event.headers.Authorization);
    const id = event.queryStringParameters && event.queryStringParameters.id;
    if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID ausente' }) };
    const body = JSON.parse(event.body || '{}');
    const { title, excerpt, date, image = '', categories = [] } = body;
    const sql = getSql();
    const updated = await sql`
      UPDATE "News" SET title = ${title}, excerpt = ${excerpt}, date = ${date}, image = ${image}, categories = ${JSON.stringify(categories)}
      WHERE id = ${Number(id)}
      RETURNING *;
    `;
    return { statusCode: 200, body: JSON.stringify(updated[0]) };
  } catch (err) {
    console.error('news-update error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal Server Error' }) };
  }
};
