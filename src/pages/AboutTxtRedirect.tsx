/**
 * AboutTxtRedirect - Redireciona /about.txt para a edge function dinâmica
 */
import { useEffect } from "react";

const AboutTxtRedirect = () => {
  useEffect(() => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    window.location.replace(
      `https://${projectId}.supabase.co/functions/v1/generate-about`
    );
  }, []);
  return null;
};

export default AboutTxtRedirect;
