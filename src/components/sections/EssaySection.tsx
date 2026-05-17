import { useSiteSettings } from "@/hooks/useSiteSettings";
import { parseJsonSetting } from "@/lib/siteSettingsHelpers";

const DEFAULT_SECTORS = ["Seguros & Serviços financeiros", "Telecom", "Mídia & Entretenimento"];
const DEFAULT_DOMAINS = ["Ecommerce", "Produto Digital", "Dados", "Observabilidade"];
const DEFAULT_LOCATION = ["Rio de Janeiro", "Brasil"];
const DEFAULT_LANGUAGES = ["PT · Nativo", "EN · Fluente"];

export function EssaySection() {
  const { settings } = useSiteSettings();

  const opening = settings.essay_opening ||
    "ei Girão começou a carreira escrevendo HTML em estúdios pequenos no Rio. Quinze anos depois, lidera squads de 35 pessoas em uma das maiores seguradoras independentes do país, com responsabilidade direta sobre o ecommerce de Seguro de Vida e a prática de observabilidade de TI. No caminho, passou pela <em>Oi</em>, pela <em>TIM</em> e pela <em>Globo</em> — cada uma com uma história que ele consegue contar em números: <strong>nota do app de 1,5 para 4,5</strong> na TIM, <strong>−40% em custos operacionais</strong> de atendimento na Oi, <strong>+20% em conversão</strong> na Icatu.";

  const second = settings.essay_second ||
    "Sua abordagem combina visão estratégica com proximidade do código. Lê dashboards de observabilidade com a mesma fluência com que lê pesquisa de usuário. Diz que o que aprendeu como desenvolvedor — começou em pequenos estúdios em 2008 — nunca o abandonou: produto bom é produto que sobe sem incidente crítico.";

  const currentCompany = settings.essay_current_company || "Icatu Seguros";
  const currentRole = settings.essay_current_role || "PM · Coordenador de TI";
  const teamDirect = settings.essay_team_direct || "20";
  const teamSquads = settings.essay_team_squads || "35";
  const teamDirectLabel = settings.essay_team_direct_label || "diretos";
  const teamSquadsLabel = settings.essay_team_squads_label || "em squads";

  const labelCurrent = settings.essay_label_current || "Atualmente";
  const labelTeam = settings.essay_label_team || "Time";
  const labelSectors = settings.essay_label_sectors || "Setores";
  const labelDomains = settings.essay_label_domains || "Domínios";
  const labelLocation = settings.essay_label_location || "Reside";
  const labelLanguages = settings.essay_label_languages || "Idiomas";

  const sectors = parseJsonSetting<string[]>(settings.essay_sectors, DEFAULT_SECTORS);
  const domains = parseJsonSetting<string[]>(settings.essay_domains, DEFAULT_DOMAINS);
  const location = parseJsonSetting<string[]>(settings.essay_location_lines, DEFAULT_LOCATION);
  const languages = parseJsonSetting<string[]>(settings.essay_languages, DEFAULT_LANGUAGES);

  return (
    <section className="ed-essay">
      <div className="ed-container">
        <div className="ed-essay-grid">
          <div className="ed-essay-side">
            <div className="row">
              <div className="h">{labelCurrent}</div>
              <div>{currentCompany}</div>
              <div>{currentRole}</div>
            </div>
            <div className="row">
              <div className="h">{labelTeam}</div>
              <div>{teamDirect} {teamDirectLabel}</div>
              <div>{teamSquads} {teamSquadsLabel}</div>
            </div>
            <div className="row">
              <div className="h">{labelSectors}</div>
              {sectors.map((s, i) => <div key={i}>{s}</div>)}
            </div>
          </div>

          <div className="ed-essay-body">
            <p>
              <span className="ed-dropcap">N</span>
              <span dangerouslySetInnerHTML={{ __html: opening }} />
            </p>
            <p dangerouslySetInnerHTML={{ __html: second }} />
          </div>

          <div className="ed-essay-side" style={{ textAlign: "right" }}>
            <div className="row">
              <div className="h">{labelDomains}</div>
              {domains.map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="row">
              <div className="h">{labelLocation}</div>
              {location.map((l, i) => <div key={i}>{l}</div>)}
            </div>
            <div className="row">
              <div className="h">{labelLanguages}</div>
              {languages.map((lng, i) => <div key={i}>{lng}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
