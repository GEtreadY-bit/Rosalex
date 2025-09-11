import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast, toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface News {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  categories: any;
  createdAt?: string;
}

const API_URL = (() => {
  // When running locally in dev, use the local backend
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return "http://localhost:4000/news";
  }
  // In production (Netlify), call the serverless function
  return "/.netlify/functions/news";
})();

const initialForm = {
  title: "",
  excerpt: "",
  date: "",
  image: "",
  categories: [],
};

const AdminPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { dismiss } = useToast();
  const navigate = useNavigate();

  // Fetch news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setError("Erro ao buscar notícias");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else if (name === 'categories') {
      setCategoryInput(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Date picker handler
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setForm({ ...form, date: format(date, "yyyy-MM-dd") });
      setCalendarOpen(false);
    }
  };

  // Função utilitária para obter o token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Create or update news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

      // helper to upload file to Cloudinary using signed upload (via cloudinary-sign function).
      // Signed upload is required; cloudinary-sign must be configured on Netlify with CLOUDINARY_API_KEY/SECRET/CLOUDINARY_CLOUD_NAME.
      const uploadToCloudinary = async (file: File) => {
        const signRes = await fetch('/.netlify/functions/cloudinary-sign', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
        if (!signRes.ok) {
          const text = await signRes.text().catch(() => '');
          throw new Error('Não foi possível obter assinatura Cloudinary: ' + (text || signRes.statusText));
        }
        const signJson = await signRes.json();
        const { signature, api_key, timestamp, cloudName } = signJson;
        if (!signature || !api_key || !timestamp || !cloudName) throw new Error('Resposta de assinatura Cloudinary inválida');
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('api_key', api_key);
        fd.append('timestamp', String(timestamp));
        fd.append('signature', signature);
        const r = await fetch(url, { method: 'POST', body: fd });
        if (!r.ok) {
          const body = await r.text().catch(() => '');
          throw new Error('Erro ao enviar imagem para Cloudinary: ' + (body || r.statusText));
        }
        const json = await r.json();
        return json.secure_url as string;
      };

      if (editing) {
        if (API_URL.startsWith('http')) {
          const formData = new FormData();
          formData.append('title', form.title);
          formData.append('excerpt', form.excerpt);
          formData.append('date', form.date);
          formData.append('categories', JSON.stringify(form.categories));
          if (form.image && typeof (form.image as any).name === 'string' && (form.image as any).type?.startsWith('image/')) {
            formData.append('image', form.image as unknown as File);
          } else if (typeof form.image === 'string') {
            formData.append('image', form.image);
          }
          await fetch(`${API_URL}/${editing.id}`, { method: 'PUT', body: formData, headers: getAuthHeaders() });
        } else {
          let imageUrl = typeof form.image === 'string' ? form.image : '';
          if (form.image && typeof (form.image as any).name === 'string') {
            imageUrl = await uploadToCloudinary(form.image as unknown as File);
          }
          await fetch('/.netlify/functions/news-update?id=' + editing.id, { method: 'POST', headers, body: JSON.stringify({ title: form.title, excerpt: form.excerpt, date: form.date, image: imageUrl, categories: form.categories }) });
        }
        toast({ title: 'Notícia atualizada com sucesso!', variant: 'default' });
      } else {
        if (API_URL.startsWith('http')) {
          const formData = new FormData();
          formData.append('title', form.title);
          formData.append('excerpt', form.excerpt);
          formData.append('date', form.date);
          formData.append('categories', JSON.stringify(form.categories));
          if (form.image && typeof (form.image as any).name === 'string' && (form.image as any).type?.startsWith('image/')) {
            formData.append('image', form.image as unknown as File);
          } else if (typeof form.image === 'string') {
            formData.append('image', form.image);
          }
          await fetch(API_URL, { method: 'POST', body: formData, headers: getAuthHeaders() });
        } else {
          let imageUrl = typeof form.image === 'string' ? form.image : '';
          if (form.image && typeof (form.image as any).name === 'string') {
            imageUrl = await uploadToCloudinary(form.image as unknown as File);
          }
          await fetch('/.netlify/functions/news-create', { method: 'POST', headers, body: JSON.stringify({ title: form.title, excerpt: form.excerpt, date: form.date, image: imageUrl, categories: form.categories }) });
        }
        toast({ title: 'Notícia criada com sucesso!', variant: 'default' });
      }
      setForm(initialForm);
      setEditing(null);
      fetchNews();
    } catch (err) {
      console.error('handleSubmit error:', err);
      setError('Erro ao salvar notícia');
      toast({ title: 'Erro ao salvar notícia', variant: 'destructive' });
    }
    setSubmitting(false);
  };

  // Edit news
  const handleEdit = (item: News) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      date: item.date || "",
      image: item.image || "",
      categories: Array.isArray(item.categories) ? item.categories : (item.categories ? JSON.parse(item.categories) : []),
    });
  };

  // Delete news
  const handleDelete = async (id: number) => {
    setDeleteId(id);
  };
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      if (API_URL.startsWith('http')) {
        await fetch(`${API_URL}/${deleteId}`, { method: 'DELETE', headers: getAuthHeaders() });
      } else {
        const token = localStorage.getItem('adminToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await fetch('/.netlify/functions/news-delete?id=' + deleteId, { method: 'POST', headers });
      }
      fetchNews();
      toast({ title: "Notícia excluída com sucesso!", variant: "default" });
    } catch {
      setError("Erro ao excluir notícia");
      toast({ title: "Erro ao excluir notícia", variant: "destructive" });
    }
    setDeleteId(null);
  };

  // Corrige o caminho da imagem para ser absoluto no frontend
  const getImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    // Garante que o caminho seja relativo ao backend
    return `http://localhost:4000${image}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rosalex-brown-50 to-white py-6 sm:py-10 flex flex-col items-center px-2">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-rosalex-brown-900 tracking-tight drop-shadow animate-fade-in text-center">
        Painel Administrativo <span className="text-rosalex-accent-orange">Notícias</span>
      </h1>
      <div className="w-full max-w-xs sm:max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-10 border border-rosalex-brown-100 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-rosalex-brown-800 flex items-center gap-2">
          {editing ? <span className="text-rosalex-accent-orange">Editar Notícia</span> : <span>Nova Notícia</span>}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-rosalex-brown-700">Título</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-rosalex-brown-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rosalex-accent-orange focus:outline-none bg-rosalex-brown-50 text-rosalex-brown-900 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-rosalex-brown-700">Resumo</label>
              <input
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                className="w-full border border-rosalex-brown-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rosalex-accent-orange focus:outline-none bg-rosalex-brown-50 text-rosalex-brown-900 text-base"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-rosalex-brown-700">Data</label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                className="w-full border border-rosalex-brown-200 rounded-lg px-3 py-2 text-left bg-rosalex-brown-50 text-rosalex-brown-900 focus:ring-2 focus:ring-rosalex-accent-orange focus:outline-none text-base"
                    onClick={() => setCalendarOpen(true)}
                  >
                    {form.date ? format(new Date(form.date), "dd/MM/yyyy") : "Selecionar data"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.date ? new Date(form.date) : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
            <label className="block text-sm font-semibold mb-2 text-rosalex-brown-700">Imagem (jpeg/png)</label>
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleChange}
                className="w-full border border-rosalex-brown-200 rounded-lg px-3 py-2 bg-rosalex-brown-50 text-rosalex-brown-900 text-base"
              />
              {form.image && typeof form.image === 'string' && (
                <img src={getImageUrl(form.image)} alt="Pré-visualização" className="max-h-20 sm:max-h-24 mt-2 rounded shadow border border-rosalex-brown-100" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-rosalex-brown-700">Categorias <span className="text-xs text-rosalex-brown-400">(separadas por vírgula ou Enter)</span></label>
            <input
              name="categories"
              value={categoryInput}
              onChange={handleChange}
              className="w-full border border-rosalex-brown-200 rounded-lg px-4 py-2 bg-rosalex-brown-50 text-rosalex-brown-900 focus:ring-2 focus:ring-rosalex-accent-orange focus:outline-none"
              placeholder="ex: Educação, Evento"
              onKeyDown={e => {
                if (e.key === ',' || e.key === 'Enter') {
                  e.preventDefault();
                  const value = categoryInput.trim();
                  if (value && !form.categories.includes(value)) {
                    setForm({ ...form, categories: [...form.categories, value] });
                  }
                  setCategoryInput("");
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {Array.isArray(form.categories) && form.categories.map((cat: string, idx: number) => (
                <span key={idx} className="bg-rosalex-accent-orange/10 text-rosalex-accent-orange px-3 py-1 rounded-full text-xs flex items-center gap-1 font-semibold border border-rosalex-accent-orange/30">
                  {cat}
                  <button type="button" className="ml-1 text-rosalex-accent-orange hover:text-red-600 font-bold" onClick={() => {
                    setForm({ ...form, categories: form.categories.filter((c: string) => c !== cat) });
                  }}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <button type="submit" className="bg-rosalex-accent-orange hover:bg-rosalex-accent-orange/90 text-white px-6 py-2 rounded-lg font-bold shadow transition-all duration-200 disabled:opacity-60" disabled={submitting}>
              {editing ? "Salvar Alterações" : "Criar Notícia"}
            </button>
            {editing && (
              <button type="button" className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-bold text-rosalex-brown-700 shadow transition-all duration-200" onClick={() => { setEditing(null); setForm(initialForm); }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 border border-rosalex-brown-100 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-rosalex-brown-800 flex items-center gap-2">
          Notícias Cadastradas
        </h2>
        {loading ? (
          <p className="text-center text-rosalex-brown-400">Carregando...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : news.length === 0 ? (
          <p className="text-center text-rosalex-brown-400">Nenhuma notícia cadastrada.</p>
        ) : (
          <ul className="space-y-6">
            {news.map((item) => (
              <li key={item.id} className="border-b border-rosalex-brown-100 pb-4 flex flex-col md:flex-row md:items-center md:justify-between group hover:bg-rosalex-brown-50/40 rounded-lg transition-all duration-200">
                <div className="flex-1">
                  <div className="font-bold text-lg text-rosalex-brown-900 mb-1 flex items-center gap-2">
                    {item.title}
                  </div>
                  <div className="text-sm text-rosalex-brown-700 whitespace-pre-line mb-1">{item.excerpt}</div>
                  <div className="text-xs text-gray-400 mb-1">{item.date}</div>
                  {item.image && (
                    <img src={getImageUrl(item.image)} alt="imagem da notícia" className="max-h-20 mt-2 rounded shadow border border-rosalex-brown-100" onError={e => (e.currentTarget.style.display = 'none')} />
                  )}
                  {item.categories && Array.isArray(item.categories) && item.categories.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {item.categories.map((cat: string, idx: number) => (
                        <span key={idx} className="bg-rosalex-accent-orange/10 text-rosalex-accent-orange px-2 py-0.5 rounded-full text-xs font-semibold border border-rosalex-accent-orange/30">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                  <button className="text-blue-600 hover:underline font-semibold" onClick={() => handleEdit(item)}>Editar</button>
                  <button className="text-red-600 hover:underline font-semibold" onClick={() => handleDelete(item.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Modal de confirmação de exclusão */}
      <AlertDialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} autoFocus>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;

// Atalho global para abrir login admin (Ctrl+Shift+A)
// (Coloque este hook em App.tsx para funcionar em todo o site)
