import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Code, GraduationCap, FolderOpen, AlertTriangle, CheckCircle, Image, FileText, Newspaper, Quote, Award, Building2, BarChart3, HelpCircle, Hash, Mail, PenLine } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentItem {
  id: string;
  meta_title?: string | null;
  meta_description?: string | null;
  slug?: string | null;
  logo_url?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
}

interface SimpleCountItem {
  id: string;
}

interface DashboardStatsProps {
  experiences: ContentItem[];
  skills: ContentItem[];
  education: ContentItem[];
  projects: ContentItem[];
  articles?: ContentItem[];
  testimonials?: SimpleCountItem[];
  certifications?: SimpleCountItem[];
  companies?: SimpleCountItem[];
  metrics?: SimpleCountItem[];
  faqs?: SimpleCountItem[];
  unreadMessages?: number;
  draftArticles?: number;
  isLoading: boolean;
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  complete: number;
  incomplete: number;
  missingImage: number;
  isLoading?: boolean;
}

function StatCard({ title, count, icon, complete, incomplete, missingImage, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-12 mb-2" />
          <Skeleton className="h-3 w-full" />
        </CardContent>
      </Card>
    );
  }

  const completionRate = count > 0 ? Math.round((complete / count) * 100) : 0;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" aria-label={`${count} ${title.toLowerCase()}`}>{count}</div>
        <div className="mt-3 space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100} aria-label={`${completionRate}% completo`}>
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {complete > 0 && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 gap-1">
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
                <span>{complete} completo{complete !== 1 ? 's' : ''}</span>
              </Badge>
            )}
            {incomplete > 0 && (
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 gap-1">
                <FileText className="h-3 w-3" aria-hidden="true" />
                <span>{incomplete} sem SEO</span>
              </Badge>
            )}
            {missingImage > 0 && (
              <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400 gap-1">
                <Image className="h-3 w-3" aria-hidden="true" />
                <span>{missingImage} sem imagem</span>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function calculateStats(
  items: ContentItem[],
  imageField: 'logo_url' | 'image_url' | 'cover_image_url' = 'logo_url',
) {
  const complete = items.filter(item =>
    item.meta_title &&
    item.meta_description &&
    item.slug &&
    item[imageField]
  ).length;

  const missingSlug = items.filter(item => !item.slug).length;
  const missingSeometa = items.filter(item => !item.meta_title || !item.meta_description).length;
  const missingSeo = items.filter(item =>
    !item.meta_title || !item.meta_description || !item.slug
  ).length;

  const missingImage = items.filter(item => !item[imageField]).length;

  return { complete, missingSeo, missingSlug, missingSeometa, missingImage };
}

interface AlertEntry { label: string; count: number; }

function HealthAlertsCard({
  slugAlerts,
  metaAlerts,
  isLoading,
}: {
  slugAlerts: AlertEntry[];
  metaAlerts: AlertEntry[];
  isLoading: boolean;
}) {
  if (isLoading) return null;

  const totalSlugs = slugAlerts.reduce((s, a) => s + a.count, 0);
  const totalMeta = metaAlerts.reduce((s, a) => s + a.count, 0);
  const hasAlerts = totalSlugs > 0 || totalMeta > 0;

  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          {hasAlerts
            ? <AlertTriangle className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            : <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
          }
          Alertas de Saúde
        </p>

        {!hasAlerts ? (
          <p className="text-sm text-green-600 dark:text-green-400">Tudo em dia — nenhum item sem slug ou SEO.</p>
        ) : (
          <div className="space-y-3">
            {totalSlugs > 0 && (
              <div>
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 gap-1 mb-1">
                  <Hash className="h-3 w-3" aria-hidden="true" />
                  {totalSlugs} {totalSlugs === 1 ? 'item' : 'itens'} sem slug
                </Badge>
                <p className="text-xs text-muted-foreground pl-1">
                  {slugAlerts.filter(a => a.count > 0).map(a => `${a.label} (${a.count})`).join(' · ')}
                </p>
              </div>
            )}
            {totalMeta > 0 && (
              <div>
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 gap-1 mb-1">
                  <FileText className="h-3 w-3" aria-hidden="true" />
                  {totalMeta} {totalMeta === 1 ? 'item' : 'itens'} sem meta title/description
                </Badge>
                <p className="text-xs text-muted-foreground pl-1">
                  {metaAlerts.filter(a => a.count > 0).map(a => `${a.label} (${a.count})`).join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats({
  experiences, skills, education, projects,
  articles = [], testimonials = [], certifications = [],
  companies = [], metrics = [], faqs = [],
  unreadMessages = 0, draftArticles = 0,
  isLoading,
}: DashboardStatsProps) {
  const expStats = calculateStats(experiences, 'logo_url');
  const skillStats = calculateStats(skills, 'logo_url');
  const eduStats = calculateStats(education, 'logo_url');
  const projStats = calculateStats(projects, 'image_url');
  const artStats = calculateStats(articles, 'cover_image_url');

  const seoItems = experiences.length + skills.length + education.length + projects.length + articles.length;
  const seoComplete = expStats.complete + skillStats.complete + eduStats.complete + projStats.complete + artStats.complete;
  const totalItems = seoItems + testimonials.length + certifications.length + companies.length + metrics.length + faqs.length;
  const overallCompletion = seoItems > 0 ? Math.round((seoComplete / seoItems) * 100) : 0;

  const slugAlerts: AlertEntry[] = [
    { label: 'Experiências', count: expStats.missingSlug },
    { label: 'Projetos', count: projStats.missingSlug },
    { label: 'Skills', count: skillStats.missingSlug },
    { label: 'Educação', count: eduStats.missingSlug },
    { label: 'Artigos', count: artStats.missingSlug },
  ];
  const metaAlerts: AlertEntry[] = [
    { label: 'Experiências', count: expStats.missingSeometa },
    { label: 'Projetos', count: projStats.missingSeometa },
    { label: 'Skills', count: skillStats.missingSeometa },
    { label: 'Educação', count: eduStats.missingSeometa },
    { label: 'Artigos', count: artStats.missingSeometa },
  ];

  const supplementary = [
    { label: 'Depoimentos', count: testimonials.length, icon: <Quote className="h-3.5 w-3.5" /> },
    { label: 'Certificações', count: certifications.length, icon: <Award className="h-3.5 w-3.5" /> },
    { label: 'Empresas', count: companies.length, icon: <Building2 className="h-3.5 w-3.5" /> },
    { label: 'Métricas', count: metrics.length, icon: <BarChart3 className="h-3.5 w-3.5" /> },
    { label: 'FAQs', count: faqs.length, icon: <HelpCircle className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Overall summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Visão Geral do Conteúdo</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {totalItems} itens no total · {seoComplete} de {seoItems} com SEO completo
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">{overallCompletion}%</div>
              <p className="text-xs text-muted-foreground">SEO completo</p>
            </div>
          </div>

          <div className="mt-4 w-full h-3 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={overallCompletion} aria-valuemin={0} aria-valuemax={100} aria-label={`Completude geral: ${overallCompletion}%`}>
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700"
              style={{ width: `${overallCompletion}%` }}
            />
          </div>

          {overallCompletion < 100 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>Complete os campos de SEO e imagens para melhorar sua visibilidade</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO stat cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5" role="list" aria-label="Estatísticas por categoria">
        <div role="listitem">
          <StatCard title="Experiências" count={experiences.length} icon={<Briefcase className="h-4 w-4 text-primary" />} complete={expStats.complete} incomplete={expStats.missingSeo} missingImage={expStats.missingImage} isLoading={isLoading} />
        </div>
        <div role="listitem">
          <StatCard title="Projetos" count={projects.length} icon={<FolderOpen className="h-4 w-4 text-primary" />} complete={projStats.complete} incomplete={projStats.missingSeo} missingImage={projStats.missingImage} isLoading={isLoading} />
        </div>
        <div role="listitem">
          <StatCard title="Skills" count={skills.length} icon={<Code className="h-4 w-4 text-primary" />} complete={skillStats.complete} incomplete={skillStats.missingSeo} missingImage={skillStats.missingImage} isLoading={isLoading} />
        </div>
        <div role="listitem">
          <StatCard title="Educação" count={education.length} icon={<GraduationCap className="h-4 w-4 text-primary" />} complete={eduStats.complete} incomplete={eduStats.missingSeo} missingImage={eduStats.missingImage} isLoading={isLoading} />
        </div>
        <div role="listitem">
          <StatCard title="Artigos" count={articles.length} icon={<Newspaper className="h-4 w-4 text-primary" />} complete={artStats.complete} incomplete={artStats.missingSeo} missingImage={artStats.missingImage} isLoading={isLoading} />
        </div>
      </div>

      {/* Supplementary counts */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <p className="text-sm font-semibold text-foreground mb-3">
            Conteúdo Complementar
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {testimonials.length + certifications.length + companies.length + metrics.length + faqs.length} itens
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            {supplementary.map(({ label, count, icon }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm">
                <span className="text-muted-foreground" aria-hidden="true">{icon}</span>
                <span className="font-semibold">{count}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inbox & drafts alerts */}
      {!isLoading && (unreadMessages > 0 || draftArticles > 0) && (
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" aria-hidden="true" />
              Atenção necessária
            </p>
            <div className="flex flex-wrap gap-3">
              {unreadMessages > 0 && (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 gap-1">
                  <Mail className="h-3 w-3" aria-hidden="true" />
                  {unreadMessages} {unreadMessages === 1 ? 'mensagem não lida' : 'mensagens não lidas'}
                </Badge>
              )}
              {draftArticles > 0 && (
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 gap-1">
                  <PenLine className="h-3 w-3" aria-hidden="true" />
                  {draftArticles} {draftArticles === 1 ? 'artigo em rascunho' : 'artigos em rascunho'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health alerts */}
      <HealthAlertsCard slugAlerts={slugAlerts} metaAlerts={metaAlerts} isLoading={isLoading} />
    </div>
  );
}
