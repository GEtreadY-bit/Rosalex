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
    const body = JSON.parse(event.body || '{}');
    const { title, excerpt, date, image = '', categories = [] } = body;
    if (!title || !excerpt) return { statusCode: 400, body: JSON.stringify({ error: 'Campos obrigatórios ausentes' }) };
    const sql = getSql();
    const inserted = await sql`
      INSERT INTO "News" (title, excerpt, date, image, categories)
      VALUES (${title}, ${excerpt}, ${date}, ${image}, ${JSON.stringify(categories)})
      RETURNING *;
    `;
    return { statusCode: 201, body: JSON.stringify(inserted[0]) };
  } catch (err) {
    console.error('news-create error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal Server Error' }) };
  }
};
