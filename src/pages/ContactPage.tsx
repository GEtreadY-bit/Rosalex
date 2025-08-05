import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ContactFormData {
  name: string;
  email: string;
  telefone: string; // Corrigido para bater com o backend
  assunto: string;  // Corrigido para bater com o backend
  interesse: string; // Corrigido para bater com o backend
  studentAge?: string;
  message: string;
}

const ContactPage = () => {
  const form = useForm<ContactFormData>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const interestValue = form.watch("interesse");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Mapear os campos para os nomes esperados pelo backend
      const payload = {
        name: data.name,
        email: data.email,
        telefone: data.telefone,
        assunto: data.assunto,
        interesse: data.interesse,
        studentAge: data.studentAge,
        message: data.message,
      };
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const resultado = await response.json();
      if (response.ok && resultado.success) {
        toast({
          title: 'Mensagem enviada',
          description: 'Agradecemos o seu contato. Retornaremos em breve!',
        });
        form.reset();
      } else {
        throw new Error(resultado?.error || 'Falha ao enviar o formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50 py-10 sm:py-14 md:py-16 animate-fade-in">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rosalex-gray-900 mb-4 sm:mb-6">
              Entre em Contato
            </h1>
            <p className="text-lg text-rosalex-gray-700">
              Estamos aqui para ajudar e responder a todas as suas perguntas
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-b from-rosalex-gray-50 via-white to-rosalex-pink-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="stagger-fade-in">
              <h2 className="text-2xl font-bold text-rosalex-gray-900 mb-6">Informações de Contato</h2>
              
              <div className="grid gap-6">
                <Card className="border border-rosalex-gray-100 bg-white/90 rounded-xl shadow-lg">
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <MapPin className="h-6 w-6 text-rosalex-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-rosalex-gray-900 mb-1">Endereço</h3>
                      <p className="text-rosalex-gray-700">
                        Rua Principal, Bairro Educacional<br />
                        Luanda, Angola
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-rosalex-gray-100 bg-white/90 rounded-xl shadow-lg">
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <Phone className="h-6 w-6 text-rosalex-pink-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-rosalex-gray-900 mb-1">Telefone</h3>
                      <p className="text-rosalex-gray-700">
                        +244 923 449 800<br />
                        +244 923 ""
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-rosalex-gray-100 bg-white/90 rounded-xl shadow-lg">
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <Mail className="h-6 w-6 text-rosalex-gray-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-rosalex-gray-900 mb-1">E-mail</h3>
                      <p className="text-rosalex-gray-700">
                        rosalexinfo@gmail.com
                        +
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-rosalex-gray-100 bg-white/90 rounded-xl shadow-lg">
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <Clock className="h-6 w-6 text-rosalex-gray-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-rosalex-gray-900 mb-1">Horário de Atendimento</h3>
                      <p className="text-rosalex-gray-700">
                        Segunda a Sexta: 7h às 17h<br />
                        Sábado: 8h às 12h
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-rosalex-gray-900 mb-4">Localização</h3>
                <div className="rounded-xl overflow-hidden h-64 border-2 border-rosalex-gray-200">
                 <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.841961036342!2d13.213626675017267!3d-8.89428139116177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f5b28689d7a3%3A0x808ceb8d264a4d23!2sCol%C3%A9gio%20Rosalex!5e0!3m2!1spt-PT!2sao!4v1749245203905!5m2!1spt-PT!2sao" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="border border-rosalex-gray-100 bg-white/90 rounded-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-rosalex-gray-900">Envie-nos uma Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Nome é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          rules={{ 
                            required: "E-mail é obrigatório",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "E-mail inválido"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail*</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="telefone"
                          rules={{ required: "Telefone é obrigatório" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone*</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="assunto"
                        rules={{ required: "Assunto é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assunto*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="interesse"
                        rules={{ required: "Selecione uma opção" }}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Interesse*</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="information" id="information" />
                                  <Label htmlFor="information">Informações Gerais</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="enrollment" id="enrollment" />
                                  <Label htmlFor="enrollment">Matrícula/Inscrição</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="visit" id="visit" />
                                  <Label htmlFor="visit">Agendar Visita</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {interestValue === "enrollment" && (
                        <FormField
                          control={form.control}
                          name="studentAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Faixa Etária do Aluno</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma faixa etária" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="3-5">3 a 5 anos (Educação Infantil)</SelectItem>
                                  <SelectItem value="6-10">6 a 10 anos (Fundamental I)</SelectItem>
                                  <SelectItem value="11-14">11 a 14 anos (Fundamental II)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="message"
                        rules={{ required: "Mensagem é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagemmm*</FormLabel>
                            <FormControl>
                              <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rosalex-pink-700 to-rosalex-gray-700 text-white shadow-lg hover:from-rosalex-gray-800 hover:to-rosalex-pink-800 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 rounded-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;