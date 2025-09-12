import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-4 sm:mb-6">
              Sobre o Colégio Rosalex
            </h1>
            <p className="text-base sm:text-lg text-rosalex-gray-700">
              Conheça nossa história, valores e estrutura dedicada à excelência educacional
            </p>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs defaultValue="history" className="w-full max-w-4xl mx-auto">
            <TabsList className="flex w-full flex-col sm:flex-row justify-center gap-2 mb-6 sm:mb-8 bg-white p-2 rounded-xl border border-rosalex-gray-100 shadow-sm">
              <TabsTrigger 
                value="history" 
                className="flex-1 text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 border border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rosalex-pink-100 data-[state=active]:to-rosalex-gray-50 data-[state=active]:text-rosalex-pink-800 data-[state=active]:border-rosalex-pink-300 bg-white text-rosalex-gray-700 hover:bg-rosalex-pink-50 hover:text-rosalex-pink-700"
              >História</TabsTrigger>
              <TabsTrigger 
                value="structure" 
                className="flex-1 text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 border border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rosalex-pink-100 data-[state=active]:to-rosalex-gray-50 data-[state=active]:text-rosalex-pink-800 data-[state=active]:border-rosalex-pink-300 bg-white text-rosalex-gray-700 hover:bg-rosalex-pink-50 hover:text-rosalex-pink-700"
              >Estrutura</TabsTrigger>
              <TabsTrigger 
                value="philosophy" 
                className="flex-1 text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 border border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rosalex-pink-100 data-[state=active]:to-rosalex-gray-50 data-[state=active]:text-rosalex-pink-800 data-[state=active]:border-rosalex-pink-300 bg-white text-rosalex-gray-700 hover:bg-rosalex-pink-50 hover:text-rosalex-pink-700"
              >Filosofia Educacional</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <div className="bg-white/90 rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto border border-rosalex-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-rosalex-gray-900 mb-4">Nossa História</h2>
                    <p className="text-rosalex-gray-700 mb-4">
                      Fundado em 2005, o Colégio Rosalex nasceu do sonho de dois educadores 
                      angolanos que acreditavam no poder transformador da educação de qualidade. 
                    </p>
                    <p className="text-rosalex-gray-700 mb-4">
                      Ao longo dos anos, crescemos e nos desenvolvemos, ampliando nossas instalações e 
                      oferta educacional, sempre mantendo o compromisso com a qualidade do ensino e 
                      a formação integral dos alunos.
                    </p>
                    <p className="text-rosalex-gray-700">
                      Hoje, somos uma referência educacional em Luanda, com mais de 500 alunos e 
                      uma equipe de profissionais dedicados a oferecer o melhor em educação.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg mt-6 md:mt-0">
                    <img
                      src="/IMG/IMG-20250805-WA0073.jpg"
                      alt="História do Colégio Rosalex"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="structure">
              <div className="bg-white/90 rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto border border-rosalex-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg mt-6 md:mt-0">
                    <img
                      src="/IMG/IMG-20250731-WA0004.jpg"
                      alt="Estrutura do Colégio Rosalex"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-2xl font-bold text-rosalex-gray-900 mb-4">Nossa Estrutura</h2>
                    <p className="text-rosalex-gray-700 mb-4">
                      O Colégio Rosalex conta com instalações modernas e bem equipadas, 
                      projetadas para proporcionar um ambiente de aprendizagem estimulante e acolhedor.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-rosalex-gray-700 mb-4">
                      <li>Laboratório de informática</li>
                      <li>Espaço esportivo</li>
                      <li>Refeitório com alimentação balanceada</li>
                      <li>Salas Climatizadas</li>
                    </ul>
                    <p className="text-rosalex-gray-700">
                      Nossa estrutura é constantemente atualizada para atender às demandas educacionais contemporâneas.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="philosophy">
              <div className="bg-white/90 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-rosalex-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-rosalex-gray-900 mb-4">Nossa Filosofia Educacional</h2>
                    <p className="text-rosalex-gray-700 mb-4">
                      No Colégio Rosalex, acreditamos que a educação vai além da transmissão de conteúdos. 
                      Nossa abordagem pedagógica baseia-se na formação integral do ser humano, desenvolvendo 
                      competências acadêmicas, socioemocionais e éticas.
                    </p>
                    <p className="text-rosalex-gray-700 mb-4">
                      Valorizamos a curiosidade natural e o pensamento crítico, estimulando nossos alunos 
                      a questionar, refletir e construir conhecimento de forma ativa e significativa.
                    </p>
                    <p className="text-rosalex-gray-700">
                      Buscamos formar cidadãos conscientes, solidários e preparados para os desafios do 
                      século XXI, capazes de contribuir positivamente para a sociedade angolana e global.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="/IMG/IMG-20250805-WA0172.jpg"
                      alt="Filosofia Educacional do Colégio Rosalex"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

    </Layout>
  );
};

export default AboutPage;
