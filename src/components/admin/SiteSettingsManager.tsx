/**
 * SiteSettingsManager - Admin for the editorial home + CV/About.
 * Every text on the home (`/`) can be edited here.
 */

import { useState, useEffect, useRef } from 'react';
import { useSiteSettings, useUpdateSiteSetting } from '@/hooks/useSiteSettings';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Save, FileText, ExternalLink, Newspaper, Star, FileSignature, Briefcase, Wrench, GraduationCap, Mail, AlignLeft, BookOpen, ChevronDown } from 'lucide-react';

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
    if (file.size > 10 * 1024 * 1024) { toast.error('Arquivo deve ter no máximo 10MB'); return; }
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      onChange(publicUrl);
      toast.success('Arquivo enviado!');
    } catch (e) { console.error(e); toast.error('Erro ao enviar arquivo'); }
    finally { setIsUploading(false); }
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

/* ---------- Generic JSON array editor ---------- */
function StringArrayEditor({ value, onChange, itemLabel }: { value: string[]; onChange: (v: string[]) => void; itemLabel: string }) {
  return (
    <div className="space-y-2">
      {value.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} onChange={(e) => { const n = [...value]; n[i] = e.target.value; onChange(n); }} placeholder={itemLabel} />
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...value, ''])}>+ Adicionar</Button>
    </div>
  );
}

function KeyValueEditor({ value, onChange }: { value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const entries = Object.entries(value);
  return (
    <div className="space-y-2">
      {entries.map(([k, v], i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-xs">Chave</Label>
            <Input value={k} onChange={(e) => {
              const newEntries = [...entries];
              newEntries[i] = [e.target.value, v];
              onChange(Object.fromEntries(newEntries));
            }} placeholder="ex: product" />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Label exibida</Label>
            <Input value={v} onChange={(e) => {
              const newEntries = [...entries];
              newEntries[i] = [k, e.target.value];
              onChange(Object.fromEntries(newEntries));
            }} placeholder="ex: Produto" />
          </div>
          <Button variant="ghost" size="sm" onClick={() => {
            const next = { ...value }; delete next[k]; onChange(next);
          }}>✕</Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange({ ...value, '': '' })}>+ Adicionar</Button>
    </div>
  );
}

function NavEditor({ value, onChange }: { value: { label: string; href: string }[]; onChange: (v: { label: string; href: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item.label} onChange={(e) => { const n = [...value]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }} placeholder="Label" />
          <Input value={item.href} onChange={(e) => { const n = [...value]; n[i] = { ...n[i], href: e.target.value }; onChange(n); }} placeholder="#section" />
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...value, { label: '', href: '#' }])}>+ Adicionar item</Button>
    </div>
  );
}

function CoursesEditor({ value, onChange }: { value: { title: string; meta: string }[]; onChange: (v: { title: string; meta: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {value.map((c, i) => (
        <div key={i} className="flex gap-2">
          <Input value={c.title} onChange={(e) => { const n = [...value]; n[i] = { ...n[i], title: e.target.value }; onChange(n); }} placeholder="Título do curso" />
          <Input value={c.meta} onChange={(e) => { const n = [...value]; n[i] = { ...n[i], meta: e.target.value }; onChange(n); }} placeholder="Instituição / fonte" />
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...value, { title: '', meta: '' }])}>+ Adicionar curso</Button>
    </div>
  );
}

/* ---------- Text field (stable identity, must live outside) ---------- */
interface TextFieldProps {
  k: string;
  label: string;
  placeholder?: string;
  rows?: number;
  local: Record<string, string>;
  set: (key: string, value: string) => void;
}
function TextField({ k, label, placeholder, rows, local, set }: TextFieldProps) {
  return (
    <div>
      <Label>{label}</Label>
      {rows && rows > 1
        ? <Textarea value={local[k] || ''} onChange={(e) => set(k, e.target.value)} placeholder={placeholder} rows={rows} />
        : <Input value={local[k] || ''} onChange={(e) => set(k, e.target.value)} placeholder={placeholder} />}
    </div>
  );
}

/* ---------- Collapsible section card ---------- */
function SectionCard({ id, title, icon, open, onToggle, children, contentClass = 'space-y-3' }: {
  id: string; title: string; icon: React.ReactNode;
  open: boolean; onToggle: () => void;
  children: React.ReactNode; contentClass?: string;
}) {
  return (
    <Collapsible open={open} onOpenChange={onToggle}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg select-none">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">{icon}{title}</CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200${open ? ' rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className={contentClass}>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

/* ---------- Main ---------- */
export function SiteSettingsManager() {
  const { settings, isLoading, refetch } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const [local, setLocal] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['cv', 'about', 'masthead']));
  const toggleSection = (id: string) => setOpenSections(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) setLocal(settings);
  }, [settings]);

  const set = (key: string, value: string) => { setLocal(p => ({ ...p, [key]: value })); setDirty(true); };
  const setJson = (key: string, obj: unknown) => set(key, JSON.stringify(obj));

  const getJson = <T,>(key: string, fallback: T): T => {
    try {
      if (!local[key]) return fallback;
      const p = JSON.parse(local[key]);
      return p ?? fallback;
    } catch { return fallback; }
  };

  const saveAll = async () => {
    try {
      for (const key of Object.keys(local)) {
        if (local[key] !== settings[key]) await updateSetting.mutateAsync({ key, value: local[key] });
      }
      setDirty(false);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
      refetch();
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    } catch { toast.error('Erro ao salvar configurações'); }
  };

  const discardChanges = () => {
    setLocal(settings);
    setDirty(false);
  };

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32" />)}</div>;


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sticky top-0 bg-background z-10 py-2">
        <h2 className="text-xl font-bold">Configurações do Site</h2>
        <div className="flex gap-2 items-center">
          {savedMsg && <span className="text-sm text-green-600 font-medium">✓ Salvo</span>}
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(p => !p)}>
            <ExternalLink className="h-4 w-4 mr-2" />
            {previewOpen ? 'Fechar Prévia' : 'Ver Prévia'}
          </Button>
          {dirty && (
            <Button variant="ghost" size="sm" onClick={discardChanges}>
              Descartar
            </Button>
          )}
          <Button onClick={saveAll} disabled={!dirty || updateSetting.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateSetting.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      {/* CV upload */}
      <SectionCard id="cv" title="Currículo (CV)" icon={<FileText className="h-5 w-5" />} open={openSections.has('cv')} onToggle={() => toggleSection('cv')} contentClass="">
        <FileUploader value={local.cv_file_url || '/cv-nei-girao.pdf'} onChange={(url) => set('cv_file_url', url)} label="Arquivo PDF do CV" />
      </SectionCard>

      {/* About summary */}
      <SectionCard id="about" title="Página /sobre — Resumo profissional" icon={<BookOpen className="h-5 w-5" />} open={openSections.has('about')} onToggle={() => toggleSection('about')} contentClass="">
        <RichTextEditor value={local.about_summary || ''} onChange={(v) => set('about_summary', v)} label="Resumo (renderizado na página Sobre)" />
      </SectionCard>

      {/* ================================================================ */}
      {/* HOME EDITORIAL                                                   */}
      {/* ================================================================ */}

      <div className="pt-4">
        <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider">Home Editorial — Textos por seção</h3>
        <p className="text-sm text-muted-foreground mt-1">Todos os textos da home (<code>/</code>) podem ser editados abaixo. Campos com <em>HTML</em> aceitam tags como <code>&lt;em&gt;</code> e <code>&lt;strong&gt;</code>.</p>
      </div>

      {/* Masthead */}
      <SectionCard id="masthead" title="Masthead (topo)" icon={<Newspaper className="h-5 w-5" />} open={openSections.has('masthead')} onToggle={() => toggleSection('masthead')}>
        <TextField k="masthead_brand" label="Marca" placeholder="Nei Girão" local={local} set={set} />
        <TextField k="masthead_edition" label="Edição (subtítulo)" placeholder="Edição 2026 · Vol. XV" local={local} set={set} />
        <div>
          <Label>Navegação</Label>
          <NavEditor value={getJson('masthead_nav', [
            { label: 'Cases', href: '#cases' },
            { label: 'Experiência', href: '#work' },
            { label: 'Projetos', href: '#projects' },
            { label: 'Contato', href: '#contact' },
          ])} onChange={(v) => setJson('masthead_nav', v)} />
        </div>
        <TextField k="masthead_cta_label" label="Botão CTA (canto direito)" placeholder="Baixar CV" local={local} set={set} />
      </SectionCard>

      {/* Cover */}
      <SectionCard id="cover" title="Cover (capa)" icon={<Star className="h-5 w-5" />} open={openSections.has('cover')} onToggle={() => toggleSection('cover')}>
        <div className="grid grid-cols-3 gap-3">
          <TextField k="cover_issue_left" label="Edição (esq.)" placeholder="Perfil № 01" local={local} set={set} />
          <TextField k="cover_issue_center" label="Edição (centro)" placeholder="— Um Product Leader..." local={local} set={set} />
          <TextField k="hero_location" label="Localização (dir.)" placeholder="Rio de Janeiro, Brasil" local={local} set={set} />
        </div>
        <TextField k="cover_name" label="Nome em destaque" placeholder="Nei Girão" local={local} set={set} />
        <TextField k="hero_headline" label="Headline (frase central)" placeholder="Lidero produtos digitais que entregam resultado mensurável." local={local} set={set} />
        <div className="grid grid-cols-2 gap-3">
          <TextField k="hero_years" label="Stat — anos" placeholder="15+" local={local} set={set} />
          <TextField k="cover_stat_years_label" label="Stat — label (anos)" placeholder="anos" local={local} set={set} />
          <TextField k="hero_companies_count" label="Stat — companhias" placeholder="5" local={local} set={set} />
          <TextField k="cover_stat_companies_label" label="Stat — label (companhias)" placeholder="companhias" local={local} set={set} />
        </div>
        <TextField k="cover_email_prefix" label='Frase de email (ex: "Para conversar, escreva para")' placeholder="Para conversar, escreva para" local={local} set={set} />
        <div className="grid grid-cols-3 gap-3">
          <TextField k="cover_btn_primary" label="Botão primário" placeholder="Falar comigo" local={local} set={set} />
          <TextField k="cover_btn_secondary" label="Botão secundário" placeholder="Baixar CV (.pdf)" local={local} set={set} />
          <TextField k="cover_btn_linkedin" label="Botão LinkedIn" placeholder="LinkedIn ↗" local={local} set={set} />
        </div>
      </SectionCard>

      {/* Essay */}
      <SectionCard id="essay" title="Essay (ensaio + sidebars)" icon={<AlignLeft className="h-5 w-5" />} open={openSections.has('essay')} onToggle={() => toggleSection('essay')} contentClass="space-y-4">
        <div>
          <Label>Parágrafo de abertura (HTML permitido — drop cap "N" automático)</Label>
          <Textarea value={local.essay_opening || ''} onChange={(e) => set('essay_opening', e.target.value)} rows={5} placeholder="ei Girão começou..." />
        </div>
        <div>
          <Label>Segundo parágrafo (HTML permitido)</Label>
          <Textarea value={local.essay_second || ''} onChange={(e) => set('essay_second', e.target.value)} rows={4} placeholder="Sua abordagem combina..." />
        </div>
        <div className="border-t pt-3 space-y-3">
          <Label className="font-semibold">Coluna esquerda</Label>
          <div className="grid grid-cols-2 gap-3">
            <TextField k="essay_label_current" label="Label — Atualmente" placeholder="Atualmente" local={local} set={set} />
            <div />
            <TextField k="essay_current_company" label="Empresa atual" placeholder="Icatu Seguros" local={local} set={set} />
            <TextField k="essay_current_role" label="Cargo atual" placeholder="PM · Coordenador de TI" local={local} set={set} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <TextField k="essay_label_team" label="Label — Time" placeholder="Time" local={local} set={set} />
            <TextField k="essay_team_direct" label="Diretos (nº)" placeholder="20" local={local} set={set} />
            <TextField k="essay_team_direct_label" label="Label diretos" placeholder="diretos" local={local} set={set} />
            <TextField k="essay_team_squads" label="Squads (nº)" placeholder="35" local={local} set={set} />
          </div>
          <TextField k="essay_team_squads_label" label="Label squads" placeholder="em squads" local={local} set={set} />
          <div>
            <Label>Setores ({local.essay_label_sectors || 'Setores'})</Label>
            <TextField k="essay_label_sectors" label="Label" placeholder="Setores" local={local} set={set} />
            <StringArrayEditor value={getJson('essay_sectors', ["Seguros & Serviços financeiros", "Telecom", "Mídia & Entretenimento"])} onChange={(v) => setJson('essay_sectors', v)} itemLabel="Setor" />
          </div>
        </div>
        <div className="border-t pt-3 space-y-3">
          <Label className="font-semibold">Coluna direita</Label>
          <div>
            <TextField k="essay_label_domains" label="Label — Domínios" placeholder="Domínios" local={local} set={set} />
            <StringArrayEditor value={getJson('essay_domains', ["Ecommerce", "Produto Digital", "Dados", "Observabilidade"])} onChange={(v) => setJson('essay_domains', v)} itemLabel="Domínio" />
          </div>
          <div>
            <TextField k="essay_label_location" label="Label — Reside" placeholder="Reside" local={local} set={set} />
            <StringArrayEditor value={getJson('essay_location_lines', ["Rio de Janeiro", "Brasil"])} onChange={(v) => setJson('essay_location_lines', v)} itemLabel="Linha" />
          </div>
          <div>
            <TextField k="essay_label_languages" label="Label — Idiomas" placeholder="Idiomas" local={local} set={set} />
            <StringArrayEditor value={getJson('essay_languages', ["PT · Nativo", "EN · Fluente"])} onChange={(v) => setJson('essay_languages', v)} itemLabel="Idioma" />
          </div>
        </div>
      </SectionCard>

      {/* Pull quote */}
      <SectionCard id="pullquote" title="Pull Quote" icon={<FileSignature className="h-5 w-5" />} open={openSections.has('pullquote')} onToggle={() => toggleSection('pullquote')}>
        <div><Label>Citação</Label><Textarea value={local.pull_quote || ''} onChange={(e) => set('pull_quote', e.target.value)} rows={3} /></div>
        <TextField k="pull_quote_author" label="Autor" placeholder="Nei Girão" local={local} set={set} />
      </SectionCard>

      {/* Cases */}
      <SectionCard id="cases" title="Cases (Nº 01)" icon={<Briefcase className="h-5 w-5" />} open={openSections.has('cases')} onToggle={() => toggleSection('cases')}>
        <TextField k="cases_section_num" label="Numeração + título da seção" placeholder="№ 01 — Cases selecionados" local={local} set={set} />
        <TextField k="cases_title_html" label="Título grande (HTML — use <em>)" placeholder="Histórias <em>com</em> resultado." local={local} set={set} />
        <TextField k="cases_lead" label="Lead (parágrafo abaixo do título)" rows={2} local={local} set={set} />
        <TextField k="cases_result_label" label="Label do resultado por case" placeholder="Resultado" local={local} set={set} />
      </SectionCard>

      {/* Work */}
      <SectionCard id="work" title="Trajetória (Nº 02)" icon={<Briefcase className="h-5 w-5" />} open={openSections.has('work')} onToggle={() => toggleSection('work')}>
        <TextField k="work_section_num" label="Numeração" placeholder="№ 02 — Onde estive" local={local} set={set} />
        <TextField k="work_title_html" label="Título (HTML)" placeholder="A <em>trajetória</em>." local={local} set={set} />
        <TextField k="work_lead" label="Lead" rows={2} local={local} set={set} />
      </SectionCard>

      {/* Projects */}
      <SectionCard id="projects" title="Projetos (Nº 03)" icon={<Briefcase className="h-5 w-5" />} open={openSections.has('projects')} onToggle={() => toggleSection('projects')}>
        <TextField k="projects_section_num" label="Numeração" placeholder="№ 03 — Produtos que entreguei" local={local} set={set} />
        <TextField k="projects_title_html" label="Título (HTML)" placeholder="Produtos <em>vivos</em>." local={local} set={set} />
        <TextField k="projects_lead" label="Lead" rows={2} local={local} set={set} />
      </SectionCard>

      {/* Stack */}
      <SectionCard id="stack" title="Stack (Nº 04)" icon={<Wrench className="h-5 w-5" />} open={openSections.has('stack')} onToggle={() => toggleSection('stack')}>
        <TextField k="stack_section_num" label="Numeração" placeholder="№ 04 — Ferramentas & métodos" local={local} set={set} />
        <TextField k="stack_title_html" label="Título (HTML)" placeholder="O <em>ferramental</em>." local={local} set={set} />
        <TextField k="stack_lead" label="Lead" rows={2} local={local} set={set} />
        <div>
          <Label>Labels das categorias de skills (chave técnica → texto exibido)</Label>
          <KeyValueEditor value={getJson('stack_category_labels', { product: 'Produto', data: 'Dados', obs: 'Observabilidade', domains: 'Domínios' })} onChange={(v) => setJson('stack_category_labels', v)} />
        </div>
      </SectionCard>

      {/* Credentials */}
      <SectionCard id="cred" title="Credenciais (Nº 05)" icon={<GraduationCap className="h-5 w-5" />} open={openSections.has('cred')} onToggle={() => toggleSection('cred')}>
        <TextField k="cred_section_num" label="Numeração" placeholder="№ 05 — Formação, cursos & certificações" local={local} set={set} />
        <TextField k="cred_title_html" label="Título (HTML)" placeholder="<em>Credenciais</em>." local={local} set={set} />
        <TextField k="cred_lead" label="Lead" rows={2} local={local} set={set} />
        <div className="grid grid-cols-3 gap-3">
          <TextField k="cred_label_education" label="Coluna 1" placeholder="Formação acadêmica" local={local} set={set} />
          <TextField k="cred_label_certs" label="Coluna 2" placeholder="Certificações" local={local} set={set} />
          <TextField k="cred_label_courses" label="Coluna 3" placeholder="Cursos" local={local} set={set} />
        </div>
        <div>
          <Label>Lista de Cursos (manual)</Label>
          <CoursesEditor value={getJson('cred_courses', [
            { title: 'Curso de Google Analytics', meta: 'Google' },
            { title: 'Scrum & Agile Foundations', meta: 'Prática contínua' },
            { title: 'Design Thinking', meta: 'Prática contínua' },
          ])} onChange={(v) => setJson('cred_courses', v)} />
        </div>
      </SectionCard>

      {/* Contact */}
      <SectionCard id="contact" title="Contato (Nº 06)" icon={<Mail className="h-5 w-5" />} open={openSections.has('contact')} onToggle={() => toggleSection('contact')}>
        <TextField k="contact_section_num" label="Numeração" placeholder="№ 06 — Contato" local={local} set={set} />
        <TextField k="contact_title_html" label="Título (HTML)" placeholder="Vamos <em>conversar</em>." local={local} set={set} />
        <div><Label>Texto introdutório (pitch)</Label><Textarea value={local.contact_pitch || ''} onChange={(e) => set('contact_pitch', e.target.value)} rows={3} /></div>
        <div className="grid grid-cols-2 gap-3">
          <TextField k="contact_email" label="Email" placeholder="neigirao@gmail.com" local={local} set={set} />
          <TextField k="contact_linkedin" label="URL LinkedIn" placeholder="https://linkedin.com/in/neigirao" local={local} set={set} />
          <TextField k="contact_whatsapp" label="URL WhatsApp" placeholder="https://wa.me/..." local={local} set={set} />
          <TextField k="contact_phone" label="Telefone exibido" placeholder="+55 21 98992-1711" local={local} set={set} />
        </div>
        <div className="grid grid-cols-2 gap-3 border-t pt-3">
          <TextField k="contact_label_email" label="Card — label email" placeholder="Por email" local={local} set={set} />
          <TextField k="contact_label_linkedin" label="Card — label LinkedIn" placeholder="LinkedIn" local={local} set={set} />
          <TextField k="contact_label_whatsapp" label="Card — label WhatsApp" placeholder="No WhatsApp" local={local} set={set} />
          <TextField k="contact_label_cv" label="Card — label CV" placeholder="Baixar CV (.pdf)" local={local} set={set} />
          <TextField k="contact_linkedin_display" label="Card — texto LinkedIn exibido" placeholder="linkedin.com/in/neigirao" local={local} set={set} />
          <TextField k="contact_cv_value" label="Card — texto CV exibido" placeholder="Nei Girão · CV · 2026" local={local} set={set} />
        </div>
      </SectionCard>

      {/* Footer */}
      <SectionCard id="footer" title="Footer" icon={<AlignLeft className="h-5 w-5" />} open={openSections.has('footer')} onToggle={() => toggleSection('footer')}>
        <div className="grid grid-cols-2 gap-3">
          <TextField k="footer_ed_left" label="Texto esquerdo" placeholder="© Nei Girão · 2026" local={local} set={set} />
          <TextField k="footer_ed_right" label="Texto direito" placeholder="Direction C · Editorial" local={local} set={set} />
        </div>
      </SectionCard>

      {/* PageSpeed */}
      <SectionCard id="perf" title="Performance" icon={<ExternalLink className="h-5 w-5" />} open={openSections.has('perf')} onToggle={() => toggleSection('perf')} contentClass="">
        <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fneigirao.lovable.app" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full"><ExternalLink className="h-4 w-4 mr-2" /> Abrir PageSpeed Insights</Button>
        </a>
      </SectionCard>

      {dirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-card border shadow-lg rounded-full px-5 py-3">
          <span className="text-sm text-muted-foreground">Alterações não salvas</span>
          <Button variant="ghost" size="sm" onClick={discardChanges}>Descartar</Button>
          <Button size="sm" onClick={saveAll} disabled={updateSetting.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateSetting.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      )}

      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent side="right" className="w-[90vw] sm:max-w-[700px] p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b shrink-0">
            <SheetTitle className="text-sm font-medium">Prévia da Home</SheetTitle>
          </SheetHeader>
          <iframe
            ref={iframeRef}
            src="/"
            className="flex-1 w-full border-0"
            title="Prévia da homepage"
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
