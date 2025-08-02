import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const NewsPreview = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/news")
      .then(res => res.json())
      .then(data => {
        // Ordena por data decrescente e pega as 3 mais recentes
        const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNews(sorted.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || news.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 animate-fade-in">
          <h2 className="section-title mb-0">Últimas Notícias</h2>
          <Button asChild variant="outline" className="border-2 border-rosalex-gray-300 text-rosalex-gray-700 bg-white hover:bg-rosalex-gray-50 hover:text-rosalex-pink-700 hover:border-rosalex-pink-400 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full">
            <Link to="/noticias">Ver Todas</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden border-rosalex-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in bg-white/90"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image.startsWith('http') ? item.image : `http://localhost:4000${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-rosalex-gray-500 mb-2">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {item.date}
                </div>
                <CardTitle className="text-xl text-rosalex-gray-900">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-rosalex-gray-600 text-base">
                  {item.excerpt}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
