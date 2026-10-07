-- Remove placeholder lab projects that were used for seeding only
DELETE FROM public.lab_projects
WHERE slug IN ('adivinha-flu', 'snap-cards', 'coaster-studio', 'comida-na-rua');
