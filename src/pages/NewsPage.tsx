import Layout from "@/components/layout/Layout"; 
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  categories: string[];
}

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');

  const NEWS_PER_PAGE = 6;
  const totalPages = Math.ceil(newsItems.length / NEWS_PER_PAGE);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const candidates = ['/news', '/.netlify/functions/news', 'http://localhost:4000/news'];
      let data: any = null;

      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`status ${res.status}`);
          data = await res.json();
          break;
        } catch (err) {
          // tenta próximo endpoint
        }
      }

      if (data) {
        // Corrige o campo categories se vier como string JSON
        const parsed = data.map((item: any) => ({
          ...item,
          categories: typeof item.categories === "string" ? JSON.parse(item.categories) : item.categories,
        }));
        setNewsItems(parsed);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  // Corrige o caminho da imagem para ser absoluto
  const getImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    // caminho absoluto vindo do backend (ex: /uploads/xxx)
    if (image.startsWith('/')) return `${window.location.origin}${image}`;
    // caso seja apenas um caminho relativo
    return `${window.location.origin}/${image}`;
  };

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(newsItems.flatMap(item => item.categories))
  ).sort();

  // Filter news based on search term and active category
  const filteredNews = newsItems.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || news.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  // Ordenação das notícias filtradas
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title, 'pt');
    } else if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title, 'pt');
    }
    return 0;
  });

  const paginatedNews = sortedNews.slice((currentPage - 1) * NEWS_PER_PAGE, currentPage * NEWS_PER_PAGE);

  // Sempre que search/filter/ordenação mudar, volta para página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-4 sm:mb-6">
              Notícias e Novidades
            </h1>
            <p className="text-base sm:text-lg text-rosalex-gray-700">
              Fique por dentro das últimas notícias e eventos do Colégio Rosalex
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
            {/* Sidebar (escondida em mobile) */}
            <div className="md:col-span-1 space-y-8 hidden md:block">
              {/* Search */}
              <div>
                <h3 className="text-lg font-bold text-rosalex-gray-900 mb-4">Buscar</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rosalex-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar notícias..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold text-rosalex-gray-900 mb-4">Categorias</h3>
                <div className="space-y-2">
                  <div
                    className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${activeCategory === null ? 'bg-rosalex-pink-100 text-rosalex-gray-900' : 'hover:bg-rosalex-pink-50 text-rosalex-gray-700'}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    Todas
                  </div>
                  {allCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${activeCategory === category ? 'bg-rosalex-pink-100 text-rosalex-gray-900' : 'hover:bg-rosalex-pink-50 text-rosalex-gray-700'}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="text-lg font-bold text-rosalex-gray-900 mb-4">Publicações Recentes</h3>
                <div className="space-y-4">
                  {newsItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100">
                        <img
                          loading="lazy"
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="max-h-12 sm:max-h-14 max-w-full rounded object-center"
                          style={{ objectFit: 'cover', background: '#f3f4f6' }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-rosalex-gray-900 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-rosalex-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile controls (search + category) */}
            <div className="md:hidden mb-4 md:mb-0">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rosalex-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar notícias..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    className="w-full border border-rosalex-gray-200 rounded px-3 py-2 bg-white text-rosalex-gray-900"
                    value={activeCategory || ''}
                    onChange={e => setActiveCategory(e.target.value || null)}
                    aria-label="Filtrar por categoria"
                  >
                    <option value="">Todas as categorias</option>
                    {allCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* News List */}
            <div className="md:col-span-3">
              {/* Controles de ordenação */}
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
                <label htmlFor="sortBy" className="text-sm text-rosalex-gray-700 font-medium">Ordenar por:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="border border-rosalex-gray-200 rounded px-3 py-1 text-rosalex-gray-900 bg-white focus:ring-rosalex-pink-400 focus:outline-none"
                  aria-label="Ordenar notícias"
                >
                  <option value="date-desc">Mais recentes</option>
                  <option value="date-asc">Mais antigas</option>
                  <option value="title-asc">Título (A-Z)</option>
                  <option value="title-desc">Título (Z-A)</option>
                </select>
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-rosalex-pink-800 mb-2">Carregando notícias...</h3>
                </div>
              ) : filteredNews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8">
                    {paginatedNews.map((news) => {
                      const excerpt = news.excerpt || '';
                      const maxChars = 140; // tamanho antes de mostrar 'Ler mais'
                      const shouldTruncate = excerpt.length > maxChars;
                      return (
                        <Card
                          key={news.id}
                          className="border-rosalex-gray-200 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer bg-white/95"
                          tabIndex={0}
                          role="button"
                          aria-label={`Ver detalhes da notícia: ${news.title}`}
                          onClick={() => setSelectedNews(news)}
                          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedNews(news); }}
                        >
                          <div className="h-72 sm:h-80 md:h-96 w-full bg-gray-100 overflow-hidden rounded-t-lg">
                            <img
                              loading="lazy"
                              src={getImageUrl(news.image)}
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              style={{ minHeight: '100%', minWidth: '100%' }}
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-sm text-rosalex-gray-500 mb-2">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              {news.date}
                            </div>
                            <CardTitle className="text-xl text-rosalex-gray-900">{news.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-rosalex-gray-600 text-sm sm:text-base leading-relaxed">
                              <div className="whitespace-pre-line">
                                {shouldTruncate ? `${excerpt.slice(0, maxChars)}...` : excerpt}
                              </div>
                              {excerpt.length > maxChars && (
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setSelectedNews(news); }}
                                  className="text-rosalex-pink-700 font-semibold mt-2 inline-block hover:underline"
                                  aria-label="Ler mais"
                                >
                                  Ler mais
                                </button>
                              )}
                            </CardDescription>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {news.categories.map((category, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="bg-rosalex-gray-50 text-rosalex-gray-700 border-rosalex-gray-200"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  {/* Controles de paginação */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-10" role="navigation" aria-label="Paginação de notícias">
                      <Button
                        variant="outline"
                        className="border-rosalex-pink-300 text-rosalex-pink-700 px-4 py-2"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                      >
                        Anterior
                      </Button>
                      <span className="text-rosalex-pink-700 font-semibold">
                        Página {currentPage} de {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        className="border-rosalex-pink-300 text-rosalex-pink-700 px-4 py-2"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima página"
                      >
                        Próxima
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-rosalex-gray-900 mb-2">Nenhuma notícia encontrada</h3>
                  <p className="text-rosalex-gray-700">
                    Não foram encontradas notícias para os critérios de busca selecionados.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-rosalex-gray-400 text-rosalex-gray-700 hover:bg-rosalex-gray-100"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory(null);
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de detalhe da notícia (custom) */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedNews(null)} />
          <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelectedNews(null)}
              aria-label="Fechar"
              className="absolute top-3 right-3 z-50 bg-white/90 rounded-full p-2 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rosalex-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
                <img
                  src={getImageUrl(selectedNews.image)}
                  alt={selectedNews.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
              <div className="flex-1 p-4 sm:p-6 flex flex-col">
                <div className="text-2xl text-rosalex-gray-900 font-semibold mb-2">{selectedNews.title}</div>
                <div className="flex items-center text-sm text-rosalex-gray-500 mb-4">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {selectedNews.date}
                </div>
                <div className="text-rosalex-gray-700 text-base mb-4 whitespace-pre-line">{selectedNews.excerpt}</div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {selectedNews.categories.map((category, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-rosalex-gray-50 text-rosalex-gray-700 border-rosalex-gray-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default NewsPage;