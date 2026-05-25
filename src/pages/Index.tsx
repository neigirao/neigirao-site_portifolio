import { lazy, Suspense } from "react";
import { useExperiences, useSkills, useEducation, useProjects, useCertifications, useLabProjects } from "@/hooks/usePortfolioData";
import { HomeSEOHead, DynamicSchema } from "@/components/SEO";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MastheadSection, CoverSection } from "@/components/sections";

// Lazy-load below-fold sections so their JS is deferred past first render
const EssaySection = lazy(() => import("@/components/sections/EssaySection").then(m => ({ default: m.EssaySection })));
const PullQuoteSection = lazy(() => import("@/components/sections/PullQuoteSection").then(m => ({ default: m.PullQuoteSection })));
const CasesSection = lazy(() => import("@/components/sections/CasesSection").then(m => ({ default: m.CasesSection })));
const WorkSection = lazy(() => import("@/components/sections/WorkSection").then(m => ({ default: m.WorkSection })));
const ProjectsEditorialSection = lazy(() => import("@/components/sections/ProjectsEditorialSection").then(m => ({ default: m.ProjectsEditorialSection })));
const StackSection = lazy(() => import("@/components/sections/StackSection").then(m => ({ default: m.StackSection })));
const CredentialsSection = lazy(() => import("@/components/sections/CredentialsSection").then(m => ({ default: m.CredentialsSection })));
const LabSection = lazy(() => import("@/components/sections/LabSection").then(m => ({ default: m.LabSection })));
const ContactEditorialSection = lazy(() => import("@/components/sections/ContactEditorialSection").then(m => ({ default: m.ContactEditorialSection })));
const FooterEditorialSection = lazy(() => import("@/components/sections/FooterEditorialSection").then(m => ({ default: m.FooterEditorialSection })));

const Index = () => {
  // Fetch all data eagerly so it's ready when lazy sections render
  const { experiences, isLoading: loadingExperiences } = useExperiences();
  const { skills, isLoading: loadingSkills } = useSkills();
  const { education, isLoading: loadingEducation } = useEducation();
  const { projects, isLoading: loadingProjects } = useProjects();
  const { certifications, isLoading: loadingCerts } = useCertifications();
  const { labProjects, isLoading: loadingLab } = useLabProjects();

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

          <Suspense fallback={null}>
            <ErrorBoundary><EssaySection /></ErrorBoundary>
            <ErrorBoundary><PullQuoteSection /></ErrorBoundary>
            <ErrorBoundary>
              <WorkSection experiences={experiences} isLoading={loadingExperiences} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CasesSection experiences={experiences} isLoading={loadingExperiences} />
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
            <ErrorBoundary>
              <LabSection labProjects={labProjects} isLoading={loadingLab} />
            </ErrorBoundary>
            <ErrorBoundary><ContactEditorialSection /></ErrorBoundary>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <FooterEditorialSection />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
