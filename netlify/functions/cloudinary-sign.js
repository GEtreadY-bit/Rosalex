const crypto = require('crypto');

exports.handler = async function (event) {
  try {
    // Only POST allowed
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    const body = event.body ? JSON.parse(event.body) : {};
    // optional folder param
    const folder = body.folder;

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!apiSecret || !apiKey || !cloudName) {
      console.error('Cloudinary not configured');
      return { statusCode: 500, body: JSON.stringify({ error: 'Cloudinary not configured' }) };
    }

    const timestamp = Math.floor(Date.now() / 1000);
    // Build string to sign. Include folder if provided.
    let paramsToSign = `timestamp=${timestamp}`;
    if (folder) paramsToSign += `&folder=${folder}`;

    const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature, api_key: apiKey, timestamp, cloudName }),
    };
  } catch (err) {
    console.error('cloudinary-sign error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal Server Error' }) };
  }
};
