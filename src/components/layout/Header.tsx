import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, GraduationCap, Image, Newspaper, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigation = [
    { name: "Início", href: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Sobre o Colégio", href: "/sobre", icon: <BookOpen className="w-5 h-5 mr-2" /> },
    { name: "Cursos", href: "/cursos", icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { name: "Galeria", href: "/galeria", icon: <Image className="w-5 h-5 mr-2" /> },
    { name: "Notícias", href: "/noticias", icon: <Newspaper className="w-5 h-5 mr-2" /> },
    { name: "Contacto", href: "/contato", icon: <Mail className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 overflow-hidden">
                <img 
                  src="/lovable-uploads/6b975d26-2563-4a24-a53a-2eba4448ed64.png" 
                  alt="Logo Colégio Rosalex"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-rosalex-pink-800">Colégio Rosalex</h1>
                <p className="text-xs text-rosalex-pink-500">Educação com Excelência</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 hover:bg-rosalex-pink-100 hover:text-rosalex-pink-900 hover:scale-105 relative ${isActive ? 'text-rosalex-pink-900' : 'text-rosalex-pink-700'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.icon}
                    {item.name}
                    {/* Animated underline for active link */}
                    <span
                      className={`absolute left-2 right-2 -bottom-1 h-[3px] rounded-full bg-rosalex-pink-400 transition-all duration-300 origin-left ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                      style={{ transitionProperty: 'opacity, transform', transitionDuration: '300ms', transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-rosalex-pink-700 hover:bg-rosalex-pink-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden bg-white animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center py-3 px-3 rounded-md text-base font-medium text-rosalex-pink-700 hover:bg-rosalex-pink-100 hover:text-rosalex-pink-900 transition-all duration-300"
                  onClick={toggleMobileMenu}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
