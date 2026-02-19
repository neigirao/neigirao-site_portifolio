import { useState, useEffect, useRef, useCallback } from 'react';

type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'recovered';

interface UseAutosaveOptions<T> {
  key: string;
  data: T;
  debounceMs?: number;
  onRecover?: (data: T) => void;
}

export function useAutosave<T extends Record<string, unknown>>({
  key,
  data,
  debounceMs = 5000,
  onRecover,
}: UseAutosaveOptions<T>) {
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const storageKey = `autosave-${key}`;
  const hasRecovered = useRef(false);

  // Try to recover draft on mount
  useEffect(() => {
    if (hasRecovered.current) return;
    hasRecovered.current = true;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as T;
        const hasContent = Object.values(parsed).some(
          (v) => typeof v === 'string' && v.trim().length > 0
        );
        if (hasContent && onRecover) {
          onRecover(parsed);
          setStatus('recovered');
          setTimeout(() => setStatus('idle'), 3000);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [storageKey, onRecover]);

  // Debounced save
  useEffect(() => {
    const hasContent = Object.values(data).some(
      (v) => typeof v === 'string' && v.trim().length > 0
    );
    if (!hasContent) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setStatus('saving');
        setTimeout(() => setStatus('saved'), 300);
        setTimeout(() => setStatus('idle'), 2500);
      } catch {
        // storage full, ignore
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, debounceMs, storageKey]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(storageKey);
    setStatus('idle');
  }, [storageKey]);

  return { status, clearDraft };
}
