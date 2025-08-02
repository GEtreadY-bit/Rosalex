const nodemailer = require('nodemailer');

// Configure usando variáveis de ambiente ou substitua pelos dados reais
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 465,
  secure: true, // true para 465, false para outras portas
  auth: {
    user: process.env.MAIL_USER || 'seu_email@gmail.com',
    pass: process.env.MAIL_PASS || 'sua_senha',
  },
  tls: {
    rejectUnauthorized: false, // Permite certificados autoassinados (resolve erro de self-signed certificate)
  },
});

module.exports = transporter;
