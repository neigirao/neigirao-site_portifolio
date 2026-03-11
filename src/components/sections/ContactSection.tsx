import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MailIcon, LinkedInIcon, PhoneIcon } from "@/components/Icons";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP } from "@/config/constants";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter ao menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  message: z.string().trim().min(10, "Mensagem deve ter ao menos 10 caracteres").max(2000),
});

export function ContactSection() {
  const { settings } = useSiteSettings();
  const subtitle = settings.section_subtitle_contact || "Aberto a desafios em Product Management, dados e observabilidade";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages" as any).insert({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      } as any);

      if (error) throw error;

      toast.success("Mensagem enviada com sucesso! Retorno em breve.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-hero relative overflow-hidden scroll-mt-20">
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Vamos Conversar?</h2>
          <div className="w-24 h-1 bg-white/80 mx-auto rounded-full mb-6" />
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div>
              <Label htmlFor="contact-name" className="text-white font-medium mb-1.5 block">Nome</Label>
              <Input
                id="contact-name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40"
              />
              {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-white font-medium mb-1.5 block">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40"
              />
              {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="contact-message" className="text-white font-medium mb-1.5 block">Mensagem</Label>
              <Textarea
                id="contact-message"
                placeholder="Conte sobre seu projeto ou oportunidade..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/40 resize-none"
              />
              {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-teal-accent text-white hover:bg-teal-accent/90 shadow-glow transition-all duration-300 py-6 text-lg font-semibold"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>

          {/* Alternative Contact Methods */}
          <div className="flex flex-col justify-center gap-6">
            <p className="text-white/80 text-lg font-light mb-2">Ou entre em contato diretamente:</p>
            <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:scale-105 transition-all duration-300 w-full px-8 py-6 text-lg backdrop-blur-sm" onClick={() => window.location.href = `mailto:${AUTHOR_EMAIL}`}>
              <MailIcon className="w-6 h-6 mr-3" />
              Email
            </Button>
            <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:scale-105 transition-all duration-300 w-full px-8 py-6 text-lg backdrop-blur-sm" onClick={() => window.open(AUTHOR_LINKEDIN, "_blank")}>
              <LinkedInIcon className="w-6 h-6 mr-3" />
              LinkedIn
            </Button>
            <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 w-full px-8 py-6 text-lg" onClick={() => window.open(AUTHOR_WHATSAPP, "_blank")}>
              <PhoneIcon className="w-6 h-6 mr-3" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
