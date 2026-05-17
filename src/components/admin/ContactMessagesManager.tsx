import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Eye, Download, RefreshCw } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar mensagens');
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir mensagem de ${name}?`)) return;
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) {
      toast.error('Erro ao excluir mensagem');
    } else {
      toast.success('Mensagem excluída');
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const exportCSV = () => {
    if (!messages.length) return toast.info('Nenhuma mensagem para exportar');
    const header = 'Nome,Email,Mensagem,Data\n';
    const rows = messages.map(m => {
      const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
      return [escape(m.name), escape(m.email), escape(m.message), escape(new Date(m.created_at).toLocaleString('pt-BR'))].join(',');
    }).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mensagens-contato-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Mensagens de Contato</h2>
        <div className="flex gap-2">
          <Button onClick={fetchMessages} variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" /> Atualizar
          </Button>
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Exportar CSV
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Carregando...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma mensagem recebida.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Mensagem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map(m => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell className="hidden sm:table-cell max-w-[200px] truncate">{m.message}</TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(m.created_at)}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(m)} aria-label="Ver mensagem">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id, m.name)} aria-label="Excluir mensagem">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mensagem de {selectedMessage?.name}</DialogTitle>
            <DialogDescription>{selectedMessage?.email} · {selectedMessage ? formatDate(selectedMessage.created_at) : ''}</DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm">{selectedMessage?.message}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
