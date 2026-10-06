import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const MAX_OUTPUT = 1200;
const CANVAS_DISPLAY_W = 400;

const ASPECTS: { label: string; value: number | null }[] = [
  { label: 'Livre', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
  { label: '16:9', value: 16 / 9 },
];

interface Props {
  file: File | null;
  open: boolean;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}

export function ImageCropper({ file, open, onConfirm, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [quality, setQuality] = useState(80);
  const [aspect, setAspect] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [canvasH, setCanvasH] = useState(300);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const getCanvasH = useCallback((img: HTMLImageElement, asp: number | null) => {
    const ratio = asp !== null ? asp : img.naturalWidth / img.naturalHeight;
    return Math.round(CANVAS_DISPLAY_W / ratio);
  }, []);

  // Load image when file/open changes
  useEffect(() => {
    if (!file || !open) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setCanvasH(getCanvasH(img, aspect));
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file, open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update canvas height when aspect ratio changes
  useEffect(() => {
    if (!imgRef.current) return;
    setCanvasH(getCanvasH(imgRef.current, aspect));
    setOffset({ x: 0, y: 0 });
  }, [aspect, getCanvasH]);

  // Redraw canvas whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;
    const x = (canvas.width - drawW) / 2 + offset.x;
    const y = (canvas.height - drawH) / 2 + offset.y;
    ctx.drawImage(img, x, y, drawW, drawH);
  }, [zoom, offset, canvasH]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => setDragging(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const t = e.touches[0];
    setDragging(true);
    dragStart.current = { x: t.clientX, y: t.clientY, ox: offset.x, oy: offset.y };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const t = e.touches[0];
    setOffset({
      x: dragStart.current.ox + (t.clientX - dragStart.current.x),
      y: dragStart.current.oy + (t.clientY - dragStart.current.y),
    });
  };

  const handleConfirm = () => {
    const img = imgRef.current;
    const preview = canvasRef.current;
    if (!img || !preview) return;

    const ratio = preview.width / preview.height;
    let outW: number, outH: number;
    if (preview.width >= preview.height) {
      outW = Math.min(MAX_OUTPUT, img.naturalWidth);
      outH = Math.round(outW / ratio);
    } else {
      outH = Math.min(MAX_OUTPUT, img.naturalHeight);
      outW = Math.round(outH * ratio);
    }

    const out = document.createElement('canvas');
    out.width = outW;
    out.height = outH;
    const ctx = out.getContext('2d');
    if (!ctx) return;

    const scale = outW / preview.width;
    const drawW = img.naturalWidth * zoom * scale;
    const drawH = img.naturalHeight * zoom * scale;
    const x = (outW - drawW) / 2 + offset.x * scale;
    const y = (outH - drawH) / 2 + offset.y * scale;
    ctx.drawImage(img, x, y, drawW, drawH);

    out.toBlob(
      (blob) => { if (blob) onConfirm(blob); },
      'image/jpeg',
      quality / 100,
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Ajustar imagem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {ASPECTS.map((a) => (
              <Button
                key={a.label}
                type="button"
                size="sm"
                variant={aspect === a.value ? 'default' : 'outline'}
                onClick={() => setAspect(a.value)}
              >
                {a.label}
              </Button>
            ))}
          </div>

          <canvas
            ref={canvasRef}
            width={CANVAS_DISPLAY_W}
            height={canvasH}
            className="w-full rounded border border-border cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          />

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Zoom: {zoom.toFixed(1)}×</Label>
            <Slider
              min={0.1} max={5} step={0.05}
              value={[zoom]}
              onValueChange={([v]) => setZoom(v)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Qualidade JPEG: {quality}%</Label>
            <Slider
              min={60} max={100} step={5}
              value={[quality]}
              onValueChange={([v]) => setQuality(v)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="button" onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
