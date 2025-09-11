const jwt = require('jsonwebtoken');

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const { username, password } = JSON.parse(event.body || '{}');
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
    const SECRET = process.env.JWT_SECRET || 'rosalex-secret';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) };
    }
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Usuário ou senha inválidos' }) };
  } catch (err) {
    console.error('login function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal Server Error' }) };
  }
};
