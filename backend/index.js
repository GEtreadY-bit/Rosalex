import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4000;
const SECRET = process.env.JWT_SECRET || 'rosalex-secret';

app.use(cors());
app.use(bodyParser.json());

// Configuração do multer para uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Apenas arquivos de imagem são permitidos!'));
  },
});

// Cria pasta uploads se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware para checar token JWT
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token ausente' });
  const token = auth.replace('Bearer ', '');
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Rota de login (POST /login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Usuário ou senha inválidos' });
});

// GET all news
app.get('/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(news);
  } catch (err) {
    console.error('Erro ao buscar notícias:', err);
    res.status(500).json({ error: 'Erro ao buscar notícias.' });
  }
});

// POST create news
app.post('/news', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, date, categories } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
    let parsedCategories;

    if (Array.isArray(categories)) parsedCategories = categories;
    else if (typeof categories === 'string') {
      try {
        parsedCategories = JSON.parse(categories);
      } catch {
        parsedCategories = [];
      }
    } else parsedCategories = [];

    const news = await prisma.news.create({
      data: {
        title,
        excerpt,
        date,
        image,
        categories: parsedCategories,
      },
    });

    res.status(201).json(news);
  } catch (err) {
    console.error('Erro ao criar notícia:', err);
    res.status(500).json({ error: 'Erro ao criar notícia.' });
  }
});

// PUT update news
app.put('/news/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, date, categories } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
    let parsedCategories;

    if (Array.isArray(categories)) parsedCategories = categories;
    else if (typeof categories === 'string') {
      try {
        parsedCategories = JSON.parse(categories);
      } catch {
        parsedCategories = [];
      }
    } else parsedCategories = [];

    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: { title, excerpt, date, image, categories: parsedCategories },
    });

    res.json(news);
  } catch (err) {
    console.error('Erro ao atualizar notícia:', err);
    res.status(500).json({ error: 'Erro ao atualizar notícia.' });
  }
});

// DELETE news
app.delete('/news/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: Number(id) } });
    res.json({ message: 'Notícia deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar notícia:', err);
    res.status(500).json({ error: 'Erro ao deletar notícia.' });
  }
});

// Rota de contato (mantida igual)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, interest, studentAge, message } = req.body;
    if (!name || !email || !subject || !interest || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }
    const transporter = require('./mailer');
    let interestLabel = {
      information: 'Informações Gerais',
      enrollment: 'Matrícula/Inscrição',
      visit: 'Agendar Visita',
    }[interest] || interest;
    let html = `
      <h2>Novo contato pelo site</h2>
      <p><b>Nome:</b> ${name}</p>
      <p><b>E-mail:</b> ${email}</p>
      <p><b>Telefone:</b> ${phone || '-'}</p>
      <p><b>Assunto:</b> ${subject}</p>
      <p><b>Interesse:</b> ${interestLabel}</p>
      ${interest === 'enrollment' && studentAge ? `<p><b>Faixa Etária:</b> ${studentAge}</p>` : ''}
      <p><b>Mensagem:</b></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;
    await transporter.sendMail({
      from: process.env.MAIL_FROM || 'site@colegiorosalex.com',
      to: process.env.MAIL_TO || 'rosalexinfo@gmail.com',
      subject: `[Contato Site] ${subject}`,
      html,
      replyTo: email,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Erro ao enviar e-mail de contato:', err);
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' });
  }
});

// Servir uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
