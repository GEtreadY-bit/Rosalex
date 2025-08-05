const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  const { name, email, telefone, assunto, interesse, studentAge, message } = JSON.parse(event.body);

  // Traduzir interesse para português
  let interessePT = '';
  switch (interesse) {
    case 'information':
      interessePT = 'Informações Gerais';
      break;
    case 'enrollment':
      interessePT = 'Matrícula/Inscrição';
      break;
    case 'visit':
      interessePT = 'Agendar Visita';
      break;
    default:
      interessePT = interesse;
  }

  // Traduzir faixa etária se houver
  let idadeAluno = '';
  if (interesse === 'enrollment' && studentAge) {
    if (studentAge === '3-5') idadeAluno = '3 a 5 anos (Educação Infantil)';
    else if (studentAge === '6-10') idadeAluno = '6 a 10 anos (Fundamental I)';
    else if (studentAge === '11-14') idadeAluno = '11 a 14 anos (Fundamental II)';
    else idadeAluno = studentAge;
  }

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

  let corpoEmail = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Nova mensagem recebida pelo site Rosalex</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="font-weight:bold; padding:4px 8px;">Nome:</td><td style="padding:4px 8px;">${name}</td></tr>
        <tr><td style="font-weight:bold; padding:4px 8px;">E-mail:</td><td style="padding:4px 8px;">${email}</td></tr>
        <tr><td style="font-weight:bold; padding:4px 8px;">Telefone:</td><td style="padding:4px 8px;">${safeTelefone}</td></tr>
        <tr><td style="font-weight:bold; padding:4px 8px;">Assunto:</td><td style="padding:4px 8px;">${safeAssunto}</td></tr>
        <tr><td style="font-weight:bold; padding:4px 8px;">Interesse:</td><td style="padding:4px 8px;">${interessePT}</td></tr>
        ${idadeAluno ? `<tr><td style=\"font-weight:bold; padding:4px 8px;\">Idade do Aluno:</td><td style=\"padding:4px 8px;\">${idadeAluno}</td></tr>` : ''}
        <tr><td style="font-weight:bold; padding:4px 8px; vertical-align:top;">Mensagem:</td><td style="padding:4px 8px; white-space:pre-line;">${message}</td></tr>
      </table>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nova mensagem de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${safeTelefone}\nAssunto: ${safeAssunto}\nInteresse: ${interessePT}` + (idadeAluno ? `\nIdade do Aluno: ${idadeAluno}` : '') + `\nMensagem: ${message}`,
    html: corpoEmail,
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
