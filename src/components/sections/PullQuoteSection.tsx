import { useSiteSettings } from "@/hooks/useSiteSettings";

export function PullQuoteSection() {
  const { settings } = useSiteSettings();

  const quote = settings.pull_quote ||
    "Levei a nota do app de 1,5 para 4,5. Reduzi 40% dos custos. Subi a conversão em 20%. Cada número tem um time atrás.";
  const author = settings.pull_quote_author || "Nei Girão";

  return (
    <section className="ed-pull">
      <blockquote>
        <q>{quote}</q>
        <cite>— {author}</cite>
      </blockquote>
    </section>
  );
}
