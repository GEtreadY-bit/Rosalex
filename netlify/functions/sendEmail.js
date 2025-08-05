const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  const { name, email, telefone, assunto, interesse, message } = JSON.parse(event.body);

  // Garantir que os campos opcionais sejam strings
  const safeTelefone = typeof telefone === 'string' ? telefone : (telefone ? String(telefone) : '');
  const safeAssunto = typeof assunto === 'string' ? assunto : (assunto ? String(assunto) : '');
  const safeInteresse = typeof interesse === 'string' ? interesse : (interesse ? String(interesse) : '');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nova mensagem de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${safeTelefone}\nAssunto: ${safeAssunto}\nInteresse: ${safeInteresse}\nMensagem: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email enviado!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
