import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rosalex-pink-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Informações Básicas */}
            <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-rosalex-pink-800 font-bold text-xl">R</span>
              </div>
              <div>
              <h3 className="text-xl font-bold">Colégio Rosalex</h3>
              <p className="text-xs text-rosalex-pink-200">Educação com Excelência</p>
              </div>
            </div>
            <p className="text-rosalex-pink-100 text-sm">
              Formando alunos com excelência acadêmica e valores para toda a vida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-rosalex-pink-300 transition-colors">
              <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-rosalex-pink-300 transition-colors">
              <Instagram size={20} />
              </a>
              <a
              href="mailto:rosalexinfo@gmail.com"
              className="text-white hover:text-rosalex-pink-300 transition-colors"
              aria-label="Enviar email"
              >
              <Mail size={20} />
              </a>
            </div>
            </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-rosalex-pink-600 pb-2">
              Links Úteis
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Sobre o Colégio
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Cursos Oferecidos
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Galeria de Fotos
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* Cursos */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-rosalex-pink-600 pb-2">
              Nossos Cursos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cursos" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Ensino Primario
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Ensino Secundario
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-rosalex-pink-100 hover:text-white transition-colors">
                  Cursos Disponiveis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-rosalex-pink-600 pb-2">
              Contate-nos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-rosalex-pink-300 flex-shrink-0 mt-0.5" />
                <span className="text-rosalex-pink-100">
                  Rua Do Paiyol, Gamek, Luanda, Angola
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-rosalex-brown-300 flex-shrink-0 mt-0.5" />
                <span className="text-rosalex-brown-100">
                  +244 933 754 040<br />
                  +244 929 523 689<br />
                  +244 956 099 816
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-rosalex-brown-300 flex-shrink-0" />
                <span className="text-rosalex-brown-100">rosalexinfo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-rosalex-brown-700 mt-10 pt-6 text-center text-sm text-rosalex-brown-300">
          <p>&copy; {new Date().getFullYear()} Colégio Rosalex. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
