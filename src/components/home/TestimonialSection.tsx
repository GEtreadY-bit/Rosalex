import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "O Colégio Rosalex transformou a vida do meu filho. Ele desenvolveu não apenas academicamente, mas como pessoa.",
      author: "Ana Silva",
      role: "Mãe de aluno",
      avatar: "AS",
    },
    {
      quote: "A qualidade do ensino e a dedicação dos professores fazem do Rosalex uma instituição de excelência.",
      author: "Carlos Fernandes",
      role: "Pai de aluna",
      avatar: "CF",
    },
    {
      quote: "Estudar no Rosalex me preparou para a universidade e para a vida. Sou muito grata pela formação que recebi.",
      author: "Mariana Santos",
      role: "Ex-aluna",
      avatar: "MS",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="section-title text-center mb-4 inline-block">Depoimentos</h2>
          <p className="text-rosalex-brown-600 mt-8">
            Veja o que nossa comunidade escolar diz sobre a experiência no Colégio Rosalex.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-rosalex-brown-50 border-rosalex-brown-100 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-5xl text-rosalex-brown-300">"</div>
                    <p className="text-rosalex-brown-700 relative z-10 pt-4 pl-4">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center mt-6">
                    <Avatar className="h-10 w-10 mr-3 bg-rosalex-brown-300">
                      <AvatarImage src="" alt={testimonial.author} />
                      <AvatarFallback className="bg-rosalex-brown-500 text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-rosalex-brown-800">{testimonial.author}</h4>
                      <p className="text-sm text-rosalex-brown-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
