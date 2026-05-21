/**
 * useFormShortcuts — atalhos globais para forms do admin.
 *
 * - ⌘/Ctrl+S → submit do form (chama onSave)
 * - Esc → cancela edição (chama onCancel) quando há algo em edição
 * - "/" → foca o input de busca (data-search-input)
 *
 * Ignora atalhos enquanto o usuário digita em <input>/<textarea>/contenteditable,
 * exceto ⌘+S que sempre dispara (e previne o save-as do browser).
 */

import { useEffect } from 'react';

interface Options {
  onSave?: () => void;
  onCancel?: () => void;
  enabled?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
}

export function useFormShortcuts({ onSave, onCancel, enabled = true }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      // ⌘/Ctrl + S → save
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        if (onSave) {
          e.preventDefault();
          onSave();
        }
        return;
      }

      // Esc → cancel
      if (e.key === 'Escape' && onCancel) {
        // Permite Esc fechar diálogos do shadcn primeiro: só dispara fora de inputs
        if (!isTypingTarget(e.target)) {
          onCancel();
        }
        return;
      }

      // "/" → foca input de busca, se houver
      if (e.key === '/' && !isTypingTarget(e.target)) {
        const search = document.querySelector<HTMLInputElement>('[data-search-input]');
        if (search) {
          e.preventDefault();
          search.focus();
          search.select();
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSave, onCancel, enabled]);
}
