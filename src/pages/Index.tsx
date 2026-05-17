import { useExperiences, useSkills, useEducation, useProjects, useCertifications } from "@/hooks/usePortfolioData";
import { HomeSEOHead, DynamicSchema } from "@/components/SEO";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import {
  MastheadSection,
  CoverSection,
  EssaySection,
  PullQuoteSection,
  CasesSection,
  WorkSection,
  ProjectsEditorialSection,
  StackSection,
  CredentialsSection,
  ContactEditorialSection,
  FooterEditorialSection,
} from "@/components/sections";

const Index = () => {
  const { experiences, isLoading: loadingExperiences } = useExperiences();
  const { skills, isLoading: loadingSkills } = useSkills();
  const { education, isLoading: loadingEducation } = useEducation();
  const { projects, isLoading: loadingProjects } = useProjects();
  const { certifications, isLoading: loadingCerts } = useCertifications();

  return (
    <>
      <HomeSEOHead />
      <DynamicSchema />
      <div className="ed-root">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
          style={{ background: "var(--ed-accent)", color: "var(--ed-paper)" }}
        >
          Pular para o conteúdo principal
        </a>

        <ErrorBoundary><MastheadSection /></ErrorBoundary>

        <main id="main-content">
          <ErrorBoundary><CoverSection /></ErrorBoundary>
          <ErrorBoundary><EssaySection /></ErrorBoundary>
          <ErrorBoundary><PullQuoteSection /></ErrorBoundary>
          <ErrorBoundary>
            <CasesSection experiences={experiences} isLoading={loadingExperiences} />
          </ErrorBoundary>
          <ErrorBoundary>
            <WorkSection experiences={experiences} isLoading={loadingExperiences} />
          </ErrorBoundary>
          <ErrorBoundary>
            <ProjectsEditorialSection projects={projects} isLoading={loadingProjects} />
          </ErrorBoundary>
          <ErrorBoundary>
            <StackSection skills={skills} isLoading={loadingSkills} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CredentialsSection
              education={education}
              certifications={certifications}
              isLoading={loadingEducation || loadingCerts}
            />
          </ErrorBoundary>
          <ErrorBoundary><ContactEditorialSection /></ErrorBoundary>
        </main>

        <FooterEditorialSection />
      </div>
    </>
  );
};

export default Index;
