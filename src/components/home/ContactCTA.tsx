
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-lg text-rosalex-gray-100 mb-8">
            Entre em contato conosco hoje mesmo para conhecer melhor o Colégio Rosalex
            e descobrir como podemos contribuir para o futuro brilhante do seu filho.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              className="bg-white text-rosalex-pink-700 border-2 border-rosalex-gray-300 hover:bg-rosalex-gray-50 hover:text-rosalex-pink-700 hover:border-rosalex-pink-400 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full"
            >
              <Link to="/contato">Entre em Contato</Link>
            </Button>
            <Button 
              asChild
              className="bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full"
            >
              <Link to="/contato">Visitar o Colégio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
