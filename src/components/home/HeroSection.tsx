import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rosalex-gray-900 leading-tight">
              Educação com excelência e valores para a vida
            </h1>
            <p className="text-lg text-rosalex-gray-700">
              No Colégio Rosalex, formamos cidadãos capazes de transformar o futuro através de um ensino de qualidade e valores humanos sólidos.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full">
                <Link to="/contato">Inscreva-se Agora</Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-rosalex-gray-300 text-rosalex-gray-700 bg-white hover:bg-rosalex-gray-50 hover:text-rosalex-pink-700 hover:border-rosalex-pink-400 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full">
                <Link to="/sobre">Conheça Mais</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-t from-rosalex-gray-900/60 to-transparent z-10"></div>
            <img
              src="public/IMG/IMG-20250731-WA0025.jpg"
              alt="Estudantes do Colégio Rosalex"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs border border-rosalex-gray-100">
              <p className="text-rosalex-gray-800 font-medium italic">
                "Acreditamos que cada aluno tem um potencial único a ser desenvolvido."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
