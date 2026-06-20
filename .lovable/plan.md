# Carrossel de imagens em Projetos e Lab

## Objetivo
- Reduzir altura máxima da imagem do hero nas páginas de detalhe (Projetos e Lab) para **480px**.
- Permitir upload de **múltiplas imagens** no CMS e exibi-las como **carrossel** na página pública.
- A `image_url` atual vira o **primeiro slide** automaticamente.

## Mudanças

### 1. Banco (migration)
- `ALTER TABLE projects ADD COLUMN images TEXT[] DEFAULT '{}'`
- `ALTER TABLE lab_projects ADD COLUMN images TEXT[] DEFAULT '{}'` (e `cover_image TEXT` para servir de capa, opcional — usaremos a primeira de `images`)

### 2. Novo componente: `MultiImageUploader`
- `src/components/admin/MultiImageUploader.tsx`
- Reusa `ImageUploader` internamente para adicionar uma imagem por vez
- Lista as imagens adicionadas em grid, com:
  - drag-and-drop para reordenar (dnd-kit, já no projeto)
  - botão remover por imagem
- Props: `value: string[]`, `onChange: (urls: string[]) => void`, `folder: string`, `label?: string`

### 3. CMS — `ProjectsManager` e `LabManager`
- Adicionar campo `images: string[]` ao `formData`
- Renderizar `<MultiImageUploader>` logo abaixo do `<ImageUploader>` existente (projetos) ou como único campo (lab, que não tinha imagem)
- Salvar `images` no insert/update
- `CompletenessIndicator`: `hasImage = !!image_url || images.length > 0`

### 4. Páginas de detalhe — carrossel
Usar `@/components/ui/carousel` (shadcn, já existente).

**`ProjectDetail.tsx`** — substituir bloco `pp-shot-frame` por:
- Computar `allImages = [project.image_url, ...project.images].filter(Boolean)`
- Se `allImages.length === 0`: manter placeholder atual
- Se `allImages.length === 1`: renderizar `<img>` único (sem controles)
- Se `> 1`: renderizar `<Carousel>` com `CarouselContent/Item/Previous/Next` + indicador "1 / N"
- Caption mostra título; se múltiplas, sufixo "Imagem X de N"

**`LabDetail.tsx`** — adicionar nova seção `pp-shot` (não existia), com mesma lógica usando apenas `lab.images`.

### 5. Tamanho compacto (480px)
Atualizar CSS em `src/index.css`:
```css
.pp-shot-frame { max-height: 480px; overflow: hidden; display: flex; justify-content: center; }
.pp-shot-frame img { max-height: 480px; width: auto; max-width: 100%; object-fit: contain; }
```
Aplicar também aos itens dentro do `CarouselItem`.

### 6. Tipos
`src/integrations/supabase/types.ts` é regenerado após a migration. Onde tipos forem usados em hooks (`usePortfolioDetail`, `useAdminData`), o campo `images` ficará disponível automaticamente. Em managers, declarar `images: string[]` na interface local.

## Arquivos tocados
- `supabase/migrations/<timestamp>_add_images_arrays.sql` (novo)
- `src/components/admin/MultiImageUploader.tsx` (novo)
- `src/components/admin/ProjectsManager.tsx`
- `src/components/admin/LabManager.tsx`
- `src/pages/ProjectDetail.tsx`
- `src/pages/LabDetail.tsx`
- `src/index.css`

## Não-objetivos
- Não alterar listagem (`/`) nem cards — só páginas de detalhe.
- Não migrar `image_url` para dentro de `images` (mantida por compatibilidade; vira primeiro slide em runtime).
- Sem lightbox/zoom nesta entrega (pode ser próxima iteração).
