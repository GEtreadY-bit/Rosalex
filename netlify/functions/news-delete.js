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
    const sql = getSql();
    await sql`DELETE FROM "News" WHERE id = ${Number(id)}`;
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('news-delete error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal Server Error' }) };
  }
};
