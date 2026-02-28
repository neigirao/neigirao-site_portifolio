/**
 * useSiteSettings - Hook para buscar e atualizar site_settings do banco.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type SiteSettings = Record<string, string>;

async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings' as any)
    .select('key, value');
  
  if (error) throw error;
  
  const settings: SiteSettings = {};
  (data as any[])?.forEach((row: { key: string; value: string }) => {
    settings[row.key] = row.value;
  });
  return settings;
}

export function useSiteSettings() {
  const query = useQuery({
    queryKey: ['site_settings'],
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000,
  });

  return {
    settings: query.data || {},
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('site_settings' as any)
        .upsert({ key, value } as any, { onConflict: 'key' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
  });
}
