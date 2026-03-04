/**
 * SiteSettingsManager - Admin component for managing site settings:
 * Hero photo, CV file, Impact Metrics texts, About section texts.
 */

import { useState, useEffect } from 'react';
import { useSiteSettings, useUpdateSiteSetting } from '@/hooks/useSiteSettings';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Save, FileText, Image, BarChart3, User as UserIcon, ExternalLink, Type, AlignLeft } from 'lucide-react';

function FileUploader({ value, onChange, label, accept = 'application/pdf', folder = 'cv' }: {
  value: string;
  onChange: (url: string) => void;
  label: string;
  accept?: string;
  folder?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Arquivo deve ter no máximo 10MB');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao enviar arquivo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL do arquivo" className="flex-1" />
        <label className="cursor-pointer">
          <input type="file" accept={accept} onChange={handleFileSelect} className="hidden" />
          <Button type="button" variant="outline" size="sm" asChild disabled={isUploading}>
            <span><Upload className="h-4 w-4 mr-1" />{isUploading ? 'Enviando...' : 'Upload'}</span>
          </Button>
        </label>
      </div>
      {value && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
          <ExternalLink className="h-3 w-3" /> Ver arquivo atual
        </a>
      )}
    </div>
  );
}

export function SiteSettingsManager() {
  const { settings, isLoading, refetch } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const [local, setLocal] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setLocal(settings);
    }
  }, [settings]);

  const set = (key: string, value: string) => {
    setLocal(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const saveAll = async () => {
    try {
      const keys = Object.keys(local);
      for (const key of keys) {
        if (local[key] !== settings[key]) {
          await updateSetting.mutateAsync({ key, value: local[key] });
        }
      }
      setDirty(false);
      toast.success('Configurações salvas!');
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    }
  };

  if (isLoading) {
    return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Configurações do Site</h2>
        <Button onClick={saveAll} disabled={!dirty || updateSetting.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {updateSetting.isPending ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>

      {/* Hero Photo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserIcon className="h-5 w-5" /> Foto do Hero
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            value={local.hero_photo_url || ''}
            onChange={(url) => set('hero_photo_url', url)}
            label="Foto de perfil (exibida no Hero)"
            folder="hero"
          />
        </CardContent>
      </Card>

      {/* CV Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" /> Currículo (CV)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader
            value={local.cv_file_url || '/cv-nei-girao.pdf'}
            onChange={(url) => set('cv_file_url', url)}
            label="Arquivo PDF do CV"
          />
        </CardContent>
      </Card>

      {/* Impact Metrics texts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" /> Textos do Impacto Mensurável
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Badge (tag superior)</Label>
            <Input
              value={local.impact_badge_text || ''}
              onChange={(e) => set('impact_badge_text', e.target.value)}
              placeholder="Ex: Resultados Comprovados"
            />
          </div>
          <div>
            <Label>Título da seção</Label>
            <Input
              value={local.impact_title || ''}
              onChange={(e) => set('impact_title', e.target.value)}
              placeholder="Ex: Impacto Mensurável"
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Textarea
              value={local.impact_subtitle || ''}
              onChange={(e) => set('impact_subtitle', e.target.value)}
              placeholder="Ex: Resultados concretos que demonstram..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* About Section texts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Image className="h-5 w-5" /> Textos da Seção Sobre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Subtítulo da seção</Label>
            <Input
              value={local.about_subtitle || ''}
              onChange={(e) => set('about_subtitle', e.target.value)}
              placeholder="Ex: Trajetória, metodologia e formação"
            />
          </div>
          <div>
            <RichTextEditor
              value={local.about_summary || ''}
              onChange={(value) => set('about_summary', value)}
              label="Resumo profissional (texto principal)"
            />
          </div>
          <div>
            <Label>Ferramentas (separadas por vírgula)</Label>
            <Input
              value={local.about_tools || ''}
              onChange={(e) => set('about_tools', e.target.value)}
              placeholder="Ex: Dynatrace, Grafana, Azure Monitor, Google Analytics"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Stats Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" /> Hero Stats (cards numéricos)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(() => {
            let stats: { value: string; label: string }[] = [];
            try { stats = JSON.parse(local.hero_stats || '[]'); } catch { stats = []; }
            if (!Array.isArray(stats) || stats.length === 0) {
              stats = [
                { value: "15+", label: "Anos de Experiência" },
                { value: "35+", label: "Membros Gerenciados" },
                { value: "6+", label: "Produtos Lançados" },
                { value: "4", label: "Grandes Empresas" },
              ];
            }
            const updateStats = (newStats: typeof stats) => set('hero_stats', JSON.stringify(newStats));
            return (
              <>
                {stats.map((stat, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Valor {i + 1}</Label>
                      <Input value={stat.value} onChange={(e) => { const s = [...stats]; s[i] = { ...s[i], value: e.target.value }; updateStats(s); }} />
                    </div>
                    <div className="flex-[2]">
                      <Label>Label</Label>
                      <Input value={stat.label} onChange={(e) => { const s = [...stats]; s[i] = { ...s[i], label: e.target.value }; updateStats(s); }} />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => { const s = stats.filter((_, j) => j !== i); updateStats(s); }}>✕</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateStats([...stats, { value: "", label: "" }])}>
                  + Adicionar stat
                </Button>
              </>
            );
          })()}
        </CardContent>
      </Card>

      {/* Methodology Cards Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" /> Methodology Cards (Sobre)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(() => {
            const ICONS = ["BarChart3", "Users", "Activity", "Search", "GraduationCap"];
            let items: { icon: string; title: string; description: string }[] = [];
            try { items = JSON.parse(local.methodology_items || '[]'); } catch { items = []; }
            if (!Array.isArray(items) || items.length === 0) {
              items = [
                { icon: "BarChart3", title: "Data-Driven", description: "Decisões fundamentadas em dados, métricas e experimentação contínua." },
                { icon: "Users", title: "Agile Leadership", description: "Liderança de squads multidisciplinares com Scrum e Kanban." },
                { icon: "Activity", title: "Observabilidade", description: "Cultura de monitoramento proativo com Dynatrace, Grafana e Azure Monitor." },
                { icon: "Search", title: "Discovery Contínuo", description: "Validação constante com usuários e stakeholders." },
              ];
            }
            const updateItems = (newItems: typeof items) => set('methodology_items', JSON.stringify(newItems));
            return (
              <>
                {items.map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg space-y-2">
                    <div className="flex gap-2 items-end">
                      <div>
                        <Label>Ícone</Label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={item.icon}
                          onChange={(e) => { const s = [...items]; s[i] = { ...s[i], icon: e.target.value }; updateItems(s); }}
                        >
                          {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <Label>Título</Label>
                        <Input value={item.title} onChange={(e) => { const s = [...items]; s[i] = { ...s[i], title: e.target.value }; updateItems(s); }} />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => updateItems(items.filter((_, j) => j !== i))}>✕</Button>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Input value={item.description} onChange={(e) => { const s = [...items]; s[i] = { ...s[i], description: e.target.value }; updateItems(s); }} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateItems([...items, { icon: "BarChart3", title: "", description: "" }])}>
                  + Adicionar card
                </Button>
              </>
            );
          })()}
        </CardContent>
      </Card>

      {/* Hero Tags Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="h-5 w-5" /> Hero Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(() => {
            const defaultTags = [
              { label: "Product Management", icon: "🎯" },
              { label: "Transformação Digital", icon: "🚀" },
              { label: "Dados & Observabilidade", icon: "📊" },
            ];
            let tags: { label: string; icon: string }[] = [];
            try { tags = JSON.parse(local.hero_tags || '[]'); } catch { tags = []; }
            if (!Array.isArray(tags) || tags.length === 0) tags = defaultTags;
            const updateTags = (newTags: typeof tags) => set('hero_tags', JSON.stringify(newTags));
            return (
              <>
                {tags.map((tag, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="w-20">
                      <Label>Ícone</Label>
                      <Input value={tag.icon} onChange={(e) => { const t = [...tags]; t[i] = { ...t[i], icon: e.target.value }; updateTags(t); }} />
                    </div>
                    <div className="flex-1">
                      <Label>Label</Label>
                      <Input value={tag.label} onChange={(e) => { const t = [...tags]; t[i] = { ...t[i], label: e.target.value }; updateTags(t); }} />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => updateTags(tags.filter((_, j) => j !== i))}>✕</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateTags([...tags, { icon: "⭐", label: "" }])}>
                  + Adicionar tag
                </Button>
              </>
            );
          })()}
        </CardContent>
      </Card>

      {/* Hero Textos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlignLeft className="h-5 w-5" /> Hero Textos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Subtítulo (suporta HTML: &lt;br /&gt;, &lt;span&gt;)</Label>
            <Textarea
              value={local.hero_subtitle || ''}
              onChange={(e) => set('hero_subtitle', e.target.value)}
              placeholder='Liderança estratégica em produtos digitais,<br /><span class="bg-gradient-primary bg-clip-text text-transparent">dados e transformação</span>'
              rows={3}
            />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              value={local.hero_description || ''}
              onChange={(e) => set('hero_description', e.target.value)}
              placeholder="Product Manager e Estrategista de Dados com 15+ anos..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Subtítulos das Seções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="h-5 w-5" /> Subtítulos das Seções
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'section_subtitle_experience', label: 'Experiência', placeholder: 'Mais de 15 anos liderando produtos digitais e equipes em grandes empresas' },
            { key: 'section_subtitle_projects', label: 'Projetos', placeholder: 'Projetos de destaque que geraram impacto significativo' },
            { key: 'section_subtitle_skills', label: 'Habilidades', placeholder: 'Especializado em observabilidade, product management e análise de dados' },
            { key: 'section_subtitle_education', label: 'Educação', placeholder: 'Sólida formação acadêmica em tecnologia e marketing digital' },
            { key: 'section_subtitle_contact', label: 'Contato', placeholder: 'Aberto a desafios em Product Management, dados e observabilidade' },
            { key: 'section_subtitle_faq', label: 'FAQ', placeholder: 'O que recrutadores e clientes costumam perguntar' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <Label>{label}</Label>
              <Input
                value={local[key] || ''}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlignLeft className="h-5 w-5" /> Footer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Descrição do footer</Label>
            <Textarea
              value={local.footer_description || ''}
              onChange={(e) => set('footer_description', e.target.value)}
              placeholder="Product Manager especializado em Observabilidade e Produtos Digitais. Rio de Janeiro, Brasil."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* PageSpeed link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ExternalLink className="h-5 w-5" /> Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fneigirao.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir PageSpeed Insights
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-2">Analise a performance do site publicado no Google PageSpeed Insights.</p>
        </CardContent>
      </Card>
    </div>
  );
}
