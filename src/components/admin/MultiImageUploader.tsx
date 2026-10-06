import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024;

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  bucket?: string;
  folder?: string;
  max?: number;
}

export function MultiImageUploader({
  value,
  onChange,
  label = 'Galeria de imagens',
  bucket = 'portfolio-images',
  folder = 'gallery',
  max = 12,
}: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const validate = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`${file.name}: formato inválido`);
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast.error(`${file.name}: muito grande (máx. 10MB)`);
      return false;
    }
    return true;
  };

  const uploadFiles = async (files: File[]) => {
    if (value.length + files.length > max) {
      toast.error(`Máximo ${max} imagens.`);
      return;
    }
    const valid = files.filter(validate);
    if (valid.length === 0) return;
    setIsUploading(true);
    try {
      const urls: string[] = [];
      for (const file of valid) {
        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
        urls.push(publicUrl);
      }
      onChange([...value, ...urls]);
      toast.success(`${urls.length} imagem(ns) enviada(s)!`);
    } catch (e: any) {
      console.error(e);
      toast.error(`Erro no upload: ${e.message || e}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) uploadFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) uploadFiles(files);
  };

  const removeAt = async (idx: number) => {
    const url = value[idx];
    if (url && url.includes(bucket)) {
      try {
        const parts = url.split(`${bucket}/`);
        if (parts[1]) await supabase.storage.from(bucket).remove([parts[1]]);
      } catch (e) {
        console.error(e);
      }
    }
    onChange(value.filter((_, i) => i !== idx));
  };

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length}/{max}
        </span>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, idx) => (
            <div key={url + idx} className="relative group rounded border bg-muted/30">
              <img src={url} alt={`Imagem ${idx + 1}`} className="w-full h-24 object-cover rounded" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6"
                  disabled={idx === 0}
                  onClick={() => move(idx, -1)}
                  title="Mover para esquerda"
                >
                  <ArrowLeft className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6"
                  disabled={idx === value.length - 1}
                  onClick={() => move(idx, 1)}
                  title="Mover para direita"
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  onClick={() => removeAt(idx)}
                  title="Remover"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <span className="absolute top-1 left-1 text-[10px] font-mono bg-black/60 text-white px-1 rounded">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-4 transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          isUploading && 'opacity-50 pointer-events-none'
        )}
      >
        <label className="flex flex-col items-center justify-center h-20 cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading || value.length >= max}
          />
          {isUploading ? (
            <span className="text-sm text-muted-foreground">Enviando...</span>
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-sm text-muted-foreground">
                {value.length >= max ? 'Limite atingido' : 'Arraste ou clique para adicionar imagens'}
              </span>
              <span className="text-xs text-muted-foreground/60">
                Múltiplas · JPG, PNG, WebP, GIF (máx. 10MB cada)
              </span>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
