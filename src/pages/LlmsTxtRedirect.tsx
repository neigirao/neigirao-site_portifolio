/**
 * LlmsTxtRedirect - Redireciona /llms.txt para a edge function dinâmica
 */
import { useEffect } from "react";

const LlmsTxtRedirect = () => {
  useEffect(() => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    window.location.replace(
      `https://${projectId}.supabase.co/functions/v1/generate-llms`
    );
  }, []);
  return null;
};

export default LlmsTxtRedirect;
