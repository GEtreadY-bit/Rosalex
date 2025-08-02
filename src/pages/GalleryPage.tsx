
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

const GalleryPage = () => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  const schoolImages = [
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Fachada do colégio",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      alt: "Sala de aula moderna",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1186&q=80",
      alt: "Laboratório de ciências",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Biblioteca",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Quadra poliesportiva",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
      alt: "Refeitório",
      category: "infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Alunos em atividade de leitura",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80",
      alt: "Aula de informática",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1564898148101-82f74d4a1e89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Experimento científico",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Aula de música",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Aula de arte",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Atividade física",
      category: "activities"
    },
    {
      src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Festa de formatura",
      category: "events"
    },
    {
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Feira de ciências",
      category: "events"
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Apresentação cultural",
      category: "events"
    },
    {
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1247&q=80",
      alt: "Competição esportiva",
      category: "events"
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Dia da família na escola",
      category: "events"
    },
    {
      src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Palestra educacional",
      category: "events"
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-6">
              Galeria de Fotos
            </h1>
            <p className="text-lg text-rosalex-gray-700">
              Conheça nosso espaço, atividades e eventos através de imagens
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid max-w-md mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
              <TabsTrigger value="activities">Atividades</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      className="overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 h-60 border border-rosalex-gray-100 bg-white/90"
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
