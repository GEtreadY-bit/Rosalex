
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, BookOpen } from "lucide-react";

const CoursesPreview = () => {
  const courses = [
    {
      title: "Ensino Primario",
      icon: <Book className="h-8 w-8 text-rosalex-gray-700" />,
      description: "Formação fundamental com foco no desenvolvimento integral da criança.",
      levels: "1º ao 6º ano",
      color: "bg-gradient-to-br from-rosalex-gray-50 to-rosalex-pink-50",
    },
    {
      title: "Ensino Secundario",
      icon: <BookOpen className="h-8 w-8 text-rosalex-pink-700" />,
      description: "Preparação acadêmica sólida para o futuro profissional dos nossos alunos.",
      levels: "7º ao 9º ano",
      color: "bg-gradient-to-br from-rosalex-gray-100 to-rosalex-pink-100",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="section-title text-center mb-4 inline-block">Nossos Cursos</h2>
          <p className="text-rosalex-gray-700 mt-8">
            Oferecemos educação de qualidade do ensino básico ao secundário, formando 
            alunos preparados para os desafios do futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {courses.map((course, index) => (
            <Card 
              key={index} 
              className={`group border-transparent ${course.color} hover:shadow-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {course.icon}
                </div>
                <CardTitle className="text-xl text-rosalex-gray-900">{course.title}</CardTitle>
                <CardDescription className="text-rosalex-gray-600 font-medium">
                  {course.levels}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-rosalex-gray-700">{course.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-rosalex-gray-300 text-rosalex-gray-700 hover:bg-rosalex-gray-100 group-hover:border-rosalex-pink-600 transition-all duration-300"
                >
                  <Link to="/cursos">Saber Mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button 
            asChild 
            className="bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 rounded-full"
          >
            <Link to="/cursos">Ver Todos os Cursos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
