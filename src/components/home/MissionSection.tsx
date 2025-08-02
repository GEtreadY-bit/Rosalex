import { BookOpen, Star, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MissionSection = () => {
  const values = [
    {
      icon: <Star className="h-10 w-10 text-rosalex-gray-400" />,
      title: "Excelência",
      description:
        "Buscamos a excelência em tudo o que fazemos, desde o ensino até as atividades extracurriculares.",
    },
    {
      icon: <Users className="h-10 w-10 text-rosalex-pink-700" />,
      title: "Respeito",
      description:
        "Incentivamos o respeito mútuo, a diversidade e a valorização das diferenças.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-rosalex-gray-700" />,
      title: "Aprendizagem",
      description:
        "Promovemos um ambiente onde o conhecimento e a curiosidade são cultivados constantemente.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="section-title text-center mb-4 inline-block">Nossa Missão e Valores</h2>
          <p className="text-rosalex-gray-700 mt-8">
            O Colégio Rosalex tem como missão proporcionar uma educação de excelência, 
            formando alunos com sólida base acadêmica e valores éticos, preparados para 
            os desafios do futuro e comprometidos com a transformação da sociedade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border-rosalex-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in bg-white/90"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{value.icon}</div>
                <CardTitle className="text-xl text-rosalex-gray-900">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-rosalex-gray-600 text-base">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
