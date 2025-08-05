import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, GraduationCap, Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
// Update the import path to match the actual file location and filename
// Update the import path to match the actual file location and filename
import TabelaPrecos from "@/components/TabelaPrecos";

const CoursesPage = () => {
  const basicEducation = [
    {
      title: "Educação Infantil",
      ages: "4 e 5 anos",
      description: "Desenvolvimento socioemocional e primeiros passos na aprendizagem formal.",
      features: ["Abordagem lúdica", "Estímulo à criatividade", "Desenvolvimento motor"],
      icon: <Book className="h-6 w-6 text-rosalex-pink-400" />, 
    },
    {
      title: "Ensino Fundamental I",
      ages: "6 a 10 anos (1º ao 5º ano)",
      description: "Base sólida em leitura, escrita, matemática e conhecimentos gerais.",
      features: ["Alfabetização completa", "Raciocínio lógico", "Iniciação científica"],
      icon: <Book className="h-6 w-6 text-rosalex-pink-400" />, 
    },
  ];

  const middleEducation = [
    {
      title: "Ensino Fundamental II",
      ages: "11 a 14 anos (6º ao 9º ano)",
      description: "Aprofundamento dos conhecimentos e desenvolvimento do pensamento crítico.",
      features: ["Disciplinas específicas", "Projetos interdisciplinares", "Preparação para o ensino médio"],
      icon: <Book className="h-6 w-6 text-rosalex-pink-400" />, 
    },
    {
      title: "Cursos Extracurriculares",
      ages: "Todas as Idades",
      description: "Formação extracurricular para alunos do Colegio.",
      features: ["Informática", "Lingua Nacional", "Ingles"],
      icon: <BookOpen className="h-6 w-6 text-rosalex-gray-400" />, 
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-4 sm:mb-6">
              Nossos Cursos
            </h1>
            <p className="text-base sm:text-lg text-rosalex-gray-700">
              Oferecemos uma educação de qualidade do ensino básico ao médio
            </p>
          </div>
        </div>
      </section>

      {/* Courses Tabs */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs defaultValue="basic" className="w-full max-w-4xl mx-auto">
            <TabsList className="flex w-full overflow-x-auto no-scrollbar sm:flex-row flex-row gap-2 sm:gap-4 mb-8 sm:mb-12 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-rosalex-gray-100 shadow-sm">
              <TabsTrigger 
                value="basic" 
                className="flex-shrink-0 min-w-[180px] text-base font-semibold px-4 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-200 border border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rosalex-pink-100 data-[state=active]:to-rosalex-gray-50 data-[state=active]:text-rosalex-pink-800 data-[state=active]:border-rosalex-pink-300 bg-white text-rosalex-gray-700 hover:bg-rosalex-pink-50 hover:text-rosalex-pink-700"
              >Ensino Primário</TabsTrigger>
              <TabsTrigger 
                value="middle" 
                className="flex-shrink-0 min-w-[220px] text-base font-semibold px-4 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-200 border border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rosalex-pink-100 data-[state=active]:to-rosalex-gray-50 data-[state=active]:text-rosalex-pink-800 data-[state=active]:border-rosalex-pink-300 bg-white text-rosalex-gray-700 hover:bg-rosalex-pink-50 hover:text-rosalex-pink-700"
              >Ensino Secundário e Extras</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <div className="bg-white/90 rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto border border-rosalex-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {basicEducation.map((course, index) => (
                    <Card 
                      key={index} 
                      className="border-rosalex-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in bg-white/95"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardHeader>
                        <div className="mb-3">{course.icon}</div>
                        <CardTitle className="text-xl text-rosalex-gray-900">{course.title}</CardTitle>
                        <CardDescription className="text-rosalex-gray-600 font-medium">
                          {course.ages}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rosalex-gray-700 mb-4">{course.description}</p>
                        <div className="space-y-2">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-rosalex-pink-400 rounded-full mr-2"></div>
                              <span className="text-rosalex-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full">
                          <Link to="/contato">Mais Informações</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="middle">
              <div className="bg-white/90 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-rosalex-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {middleEducation.map((course, index) => (
                    <Card 
                      key={index} 
                      className="border-rosalex-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in bg-white/95"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardHeader>
                        <div className="mb-3">{course.icon}</div>
                        <CardTitle className="text-xl text-rosalex-gray-900">{course.title}</CardTitle>
                        <CardDescription className="text-rosalex-gray-600 font-medium">
                          {course.ages}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rosalex-gray-700 mb-4">{course.description}</p>
                        <div className="space-y-2">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-rosalex-gray-400 rounded-full mr-2"></div>
                              <span className="text-rosalex-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full">
                          <Link to="/contato">Mais Informações</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tabela de Preços */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <TabelaPrecos />
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-rosalex-gray-900 mb-4">
              Informações Adicionais
            </h2>
            <p className="text-rosalex-gray-700">
              Diferenciais e características dos nossos cursos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-rosalex-gray-100">
              <Clock className="h-12 w-12 text-rosalex-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-rosalex-gray-900 mb-2">Horários Flexíveis</h3>
              <p className="text-rosalex-gray-700">
                Oferecemos horários de manhã e de tarde para atender às diferentes necessidades.
              </p>
            </div>
            
            <div className="bg-white/90 p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-rosalex-gray-100">
              <Users className="h-12 w-12 text-rosalex-pink-700 mb-4" />
              <h3 className="text-xl font-bold text-rosalex-gray-900 mb-2">Professores Qualificados</h3>
              <p className="text-rosalex-gray-700">
                Equipe docente com formação acadêmica sólida e experiência no mercado de trabalho.
              </p>
            </div>
            
            <div className="bg-white/90 p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-rosalex-gray-100">
              <Calendar className="h-12 w-12 text-rosalex-gray-700 mb-4" />
              <h3 className="text-xl font-bold text-rosalex-gray-900 mb-2">Calendário Acadêmico</h3>
              <p className="text-rosalex-gray-700">
                Ano letivo organizado com atividades curriculares e extracurriculares balanceadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">
              Quer saber mais sobre nossos cursos?
            </h2>
            <p className="text-lg text-rosalex-gray-100 mb-8">
              Entre em contato conosco para obter mais informações sobre matrículas e procedimentos de inscrição.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-rosalex-pink-700 border-2 border-rosalex-gray-300 hover:bg-rosalex-gray-50 hover:text-rosalex-pink-700 hover:border-rosalex-pink-400 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full"
            >
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursesPage;
