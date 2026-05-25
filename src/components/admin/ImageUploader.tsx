import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ImageCropper } from './ImageCropper';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

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
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Formato inválido. Use JPG, PNG, WebP ou GIF');
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast.error('Arquivo muito grande. Máximo 10MB');
      return false;
    }
    return true;
  };

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, blob, { contentType: 'image/jpeg', upsert: true });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange(publicUrl);
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao enviar imagem');
    } finally {
      setIsUploading(false);
      setPendingFile(null);
    }
  };

  const openCropper = (file: File) => {
    if (!validateFile(file)) return;
    setPendingFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) openCropper(file);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) openCropper(file);
    e.target.value = '';
  };

  const handleRemove = async () => {
    if (value && value.includes(bucket)) {
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
    <>
      <ImageCropper
        file={pendingFile}
        open={!!pendingFile}
        onConfirm={handleUpload}
        onCancel={() => setPendingFile(null)}
      />

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
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {isUploading ? 'Enviando...' : 'Arraste ou clique para enviar'}
                </span>
                <span className="text-xs text-muted-foreground/60 mt-1">
                  JPG, PNG, WebP ou GIF (máx. 10MB)
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
    </>
  );
}
