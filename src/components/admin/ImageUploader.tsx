/**
 * ImageUploader Component
 * 
 * Componente para upload de imagens com drag-and-drop,
 * preview e integração com Supabase Storage.
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
  folder?: string;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  altRequired?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  label = 'Imagem',
  bucket = 'portfolio-images',
  folder = 'uploads',
  altValue,
  onAltChange,
  altRequired = false,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [useUrl, setUseUrl] = useState(!!value && !value.includes(bucket));

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Apenas imagens são permitidas');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Imagem deve ter no máximo 2MB');
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao enviar imagem');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleRemove = async () => {
    if (value && value.includes(bucket)) {
      // Extract path from URL and delete from storage
      try {
        const urlParts = value.split(`${bucket}/`);
        if (urlParts[1]) {
          await supabase.storage.from(bucket).remove([urlParts[1]]);
        }
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
    onChange('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setUseUrl(!useUrl)}
          className="text-xs"
        >
          {useUrl ? <Upload className="h-3 w-3 mr-1" /> : <LinkIcon className="h-3 w-3 mr-1" />}
          {useUrl ? 'Upload' : 'URL'}
        </Button>
      </div>

      {useUrl ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-4 transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
            isUploading && 'opacity-50 pointer-events-none'
          )}
        >
          {value ? (
            <div className="relative">
              <img
                src={value}
                alt="Preview"
                className="w-full h-32 object-cover rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={handleRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-24 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {isUploading ? 'Enviando...' : 'Arraste ou clique para enviar'}
              </span>
              <span className="text-xs text-muted-foreground/60 mt-1">
                JPG, PNG ou WebP (máx. 2MB)
              </span>
            </label>
          )}
        </div>
      )}
      {onAltChange && (
        <div className="space-y-1">
          <Label htmlFor="img-alt">
            Texto alternativo (alt){altRequired && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
          </Label>
          <Input
            id="img-alt"
            value={altValue || ''}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Descrição da imagem para acessibilidade"
            required={altRequired}
          />
        </div>
      )}
    </div>
  );
}
