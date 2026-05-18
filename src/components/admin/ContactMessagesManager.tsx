import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Eye, Download, RefreshCw, MailOpen, Mail } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_at: string | null;
}

export function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar mensagens');
    } else {
      setMessages((data || []) as ContactMessage[]);
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

  const setReadState = async (m: ContactMessage, read: boolean) => {
    const read_at = read ? new Date().toISOString() : null;
    // optimistic update
    setMessages(prev => prev.map(x => x.id === m.id ? { ...x, read_at } : x));
    const { error } = await supabase
      .from('contact_messages')
      .update({ read_at })
      .eq('id', m.id);
    if (error) {
      toast.error('Erro ao atualizar status');
      // revert
      setMessages(prev => prev.map(x => x.id === m.id ? m : x));
    }
  };

  const openMessage = (m: ContactMessage) => {
    setSelectedMessage(m);
    if (!m.read_at) setReadState(m, true);
  };

  const exportCSV = () => {
    if (!messages.length) return toast.info('Nenhuma mensagem para exportar');
    const header = 'Nome,Email,Mensagem,Lida,Data\n';
    const rows = messages.map(m => {
      const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
      return [
        escape(m.name),
        escape(m.email),
        escape(m.message),
        escape(m.read_at ? 'sim' : 'não'),
        escape(new Date(m.created_at).toLocaleString('pt-BR')),
      ].join(',');
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

  const unreadCount = useMemo(() => messages.filter(m => !m.read_at).length, [messages]);
  const filtered = useMemo(() => {
    if (filter === 'unread') return messages.filter(m => !m.read_at);
    if (filter === 'read') return messages.filter(m => !!m.read_at);
    return messages;
  }, [messages, filter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Mensagens de Contato</h2>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
              {unreadCount} não lida{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchMessages} variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" /> Atualizar
          </Button>
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Exportar CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-1.5 text-xs">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-full border transition-colors ${filter === f ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:bg-muted'}`}
          >
            {f === 'all' ? `Todas (${messages.length})` : f === 'unread' ? `Não lidas (${unreadCount})` : `Lidas (${messages.length - unreadCount})`}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Carregando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma mensagem nesta visualização.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" aria-label="Status" />
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Mensagem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(m => {
              const unread = !m.read_at;
              return (
                <TableRow key={m.id} className={unread ? 'bg-primary/5' : ''}>
                  <TableCell>
                    <span className={`block h-2 w-2 rounded-full ${unread ? 'bg-primary' : 'bg-muted-foreground/30'}`} aria-label={unread ? 'Não lida' : 'Lida'} />
                  </TableCell>
                  <TableCell className={unread ? 'font-semibold' : 'font-medium'}>{m.name}</TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell className="hidden sm:table-cell max-w-[200px] truncate">{m.message}</TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(m.created_at)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setReadState(m, unread)}
                      aria-label={unread ? 'Marcar como lida' : 'Marcar como não lida'}
                      title={unread ? 'Marcar como lida' : 'Marcar como não lida'}
                    >
                      {unread ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openMessage(m)} aria-label="Ver mensagem">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id, m.name)} aria-label="Excluir mensagem">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mensagem de {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              <a href={`mailto:${selectedMessage?.email}`} className="underline">{selectedMessage?.email}</a>
              {' · '}
              {selectedMessage ? formatDate(selectedMessage.created_at) : ''}
            </DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm">{selectedMessage?.message}</p>
          {selectedMessage && (
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedMessage && setReadState(selectedMessage, !selectedMessage.read_at)}
              >
                {selectedMessage.read_at ? 'Marcar como não lida' : 'Marcar como lida'}
              </Button>
              <Button asChild size="sm">
                <a href={`mailto:${selectedMessage.email}?subject=Re: contato pelo site`}>Responder por email</a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
