// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Configuração do transporter (melhor movida para um arquivo separado)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, interest, studentAge, message } = req.body;

    // Objeto mailOptions corrigido e tipado
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Formulário do Site" <${process.env.EMAIL_USER}>`, // Remetente formal
      to: 'angeloperseu@gmail.com', // Seu email de destino
      replyTo: email, // Email do remetente para resposta
      subject: `[CONTATO] ${subject} - ${name}`, // Assunto detalhado
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Novo contato através do site</h2>
          
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Interesse:</strong> ${interest}</p>
          ${studentAge ? `<p><strong>Idade do Aluno:</strong> ${studentAge}</p>` : ''}
          
          <h3 style="margin-top: 20px; color: #333;">Mensagem:</h3>
          <div style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
      // Texto plano como fallback
      text: `
        Novo contato através do site:
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || 'Não informado'}
        Assunto: ${subject}
        Interesse: ${interest}
        ${studentAge ? `Idade do Aluno: ${studentAge}` : ''}
        
        Mensagem:
        ${message}
      `,
    };

    // Envio com tratamento de erro específico
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro completo:', error);
    return res.status(500).json({ 
      message: 'Erro ao enviar email',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}