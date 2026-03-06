import { useEffect, useCallback, useRef } from 'react';

interface UseUnsavedChangesOptions {
  hasChanges: boolean;
  message?: string;
}

export function useUnsavedChanges({ hasChanges, message = 'Você tem alterações não salvas. Deseja realmente sair?' }: UseUnsavedChangesOptions) {
  const hasChangesRef = useRef(hasChanges);
  hasChangesRef.current = hasChanges;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChangesRef.current) {
        e.preventDefault();
        e.returnValue = message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message]);

  const confirmNavigation = useCallback((callback: () => void) => {
    if (hasChangesRef.current) {
      if (confirm(message)) {
        callback();
      }
    } else {
      callback();
    }
  }, [message]);

  return { confirmNavigation };
}
