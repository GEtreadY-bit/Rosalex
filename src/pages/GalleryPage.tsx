
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

const GalleryPage = () => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  // Imagens locais distribuídas por categorias (best-guess)
  const schoolImages = [
    // Infraestrutura
    { src: "/IMG/IMG-20250731-WA0004.jpg", alt: "Fachada do colégio", category: "infrastructure" },
    { src: "/IMG/IMG-20250805-WA0189.jpg", alt: "Entrada principal", category: "infrastructure" },
    { src: "/IMG/IMG-20250731-WA0006.jpg", alt: "Pátio escolar", category: "infrastructure" },
    { src: "/IMG/IMG-20250805-WA0172.jpg", alt: "Quadra poliesportiva", category: "infrastructure" },
    { src: "/IMG/IMG-20250805-WA0239.jpg", alt: "Biblioteca", category: "infrastructure" },
    { src: "/IMG/IMG-20250731-WA0022.jpg", alt: "Refeitório", category: "infrastructure" },
    // Atividades
    { src: "/IMG/IMG-20250805-WA0121.jpg", alt: "Alunos em atividade de leitura", category: "activities" },
    { src: "/IMG/IMG-20250805-WA0164.jpg", alt: "Aula de informática", category: "activities" },
    { src: "/IMG/IMG-20250805-WA0101.jpg", alt: "Experimento científico", category: "activities" },
    { src: "/IMG/IMG-20250805-WA0095.jpg", alt: "Aula de música", category: "activities" },
    { src: "/IMG/IMG-20250805-WA0102.jpg", alt: "Aula de arte", category: "activities" },
    { src: "/IMG/IMG-20250805-WA0237.jpg", alt: "Atividade física", category: "activities" },
    // Eventos
    { src: "/IMG/IMG-20250731-WA0026.jpg", alt: "Festa de formatura", category: "events" },
    { src: "/IMG/IMG-20250805-WA0235.jpg", alt: "Feira de ciências", category: "events" },
    { src: "/IMG/IMG-20250805-WA0152.jpg", alt: "Apresentação cultural", category: "events" },
    { src: "/IMG/IMG-20250805-WA0080.jpg", alt: "Competição esportiva", category: "events" },
    { src: "/IMG/IMG-20250805-WA0077.jpg", alt: "Dia da família na escola", category: "events" },
    { src: "/IMG/IMG-20250805-WA0073.jpg", alt: "Palestra educacional", category: "events" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-4 sm:mb-6">
              Galeria de Fotos
            </h1>
            <p className="text-base sm:text-lg text-rosalex-gray-700">
              Veja momentos especiais do Colégio Rosalex
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid max-w-xs sm:max-w-md mx-auto grid-cols-2 sm:grid-cols-4 mb-8 sm:mb-12 gap-2 sm:gap-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
              <TabsTrigger value="activities">Atividades</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {schoolImages.map((image, index) => (
                  <GalleryItem 
                    key={index} 
                    image={image} 
                    onClick={() => setOpenImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="infrastructure">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {schoolImages
                  .filter(image => image.category === 'infrastructure')
                  .map((image, index) => (
                    <GalleryItem 
                      key={index} 
                      image={image} 
                      onClick={() => setOpenImage(image.src)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="activities">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {schoolImages
                  .filter(image => image.category === 'activities')
                  .map((image, index) => (
                    <GalleryItem 
                      key={index} 
                      image={image} 
                      onClick={() => setOpenImage(image.src)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {schoolImages
                  .filter(image => image.category === 'events')
                  .map((image, index) => (
                    <GalleryItem 
                      key={index} 
                      image={image} 
                      onClick={() => setOpenImage(image.src)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!openImage} onOpenChange={(open) => !open && setOpenImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <button 
              onClick={() => setOpenImage(null)}
              className="absolute top-2 right-2 bg-white/80 p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
            {openImage && (
              <img 
                src={openImage} 
                alt="Imagem ampliada" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface GalleryItemProps {
  image: {
    src: string;
    alt: string;
    category: string;
  };
  onClick: () => void;
}

const GalleryItem = ({ image, onClick }: GalleryItemProps) => {
  return (
    <div 
      className="overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 h-40 sm:h-52 md:h-60 border border-rosalex-gray-100 bg-white/90"
      onClick={onClick}
    >
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default GalleryPage;
