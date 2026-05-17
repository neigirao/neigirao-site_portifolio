import { useSiteSettings } from "@/hooks/useSiteSettings";

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

  return (
    <section className="ed-essay">
      <div className="ed-container">
        <div className="ed-essay-grid">
          <div className="ed-essay-side">
            <div className="row">
              <div className="h">Atualmente</div>
              <div>{currentCompany}</div>
              <div>{currentRole}</div>
            </div>
            <div className="row">
              <div className="h">Time</div>
              <div>{teamDirect} diretos</div>
              <div>{teamSquads} em squads</div>
            </div>
            <div className="row">
              <div className="h">Setores</div>
              <div>Seguros &amp; Serviços financeiros</div>
              <div>Telecom</div>
              <div>Mídia &amp; Entretenimento</div>
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
              <div className="h">Domínios</div>
              <div>Ecommerce</div>
              <div>Produto Digital</div>
              <div>Dados</div>
              <div>Observabilidade</div>
            </div>
            <div className="row">
              <div className="h">Reside</div>
              <div>Rio de Janeiro</div>
              <div>Brasil</div>
            </div>
            <div className="row">
              <div className="h">Idiomas</div>
              <div>PT · Nativo</div>
              <div>EN · Fluente</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
