

# Plano: Aba de Mensagens de Contato no Admin

## O que será feito
Criar um componente `ContactMessagesManager` no painel admin para listar, visualizar e exportar mensagens recebidas pelo formulário de contato.

## Alterações

### 1. Novo arquivo: `src/components/admin/ContactMessagesManager.tsx`
- Listar mensagens da tabela `contact_messages` ordenadas por `created_at` desc
- Exibir em tabela: nome, email, mensagem (truncada), data
- Modal/expansão para ver mensagem completa
- Botão de excluir mensagem individual
- Botão "Exportar CSV" que gera e baixa um arquivo `.csv` com todas as mensagens
- Seguir padrão dos outros managers (supabase direct queries, toast feedback)

### 2. Alterar: `src/pages/AdminDashboard.tsx`
- Importar `ContactMessagesManager`
- Adicionar tab `{ value: 'messages', label: 'Mensagens' }` no grupo "Sistema"
- Adicionar `<TabsContent value="messages"><ContactMessagesManager /></TabsContent>`
- Importar ícone `MessageSquare` do lucide-react

### Detalhes técnicos
- RLS já configurada: admins podem SELECT e DELETE em `contact_messages`
- Exportação CSV feita client-side (gerar string CSV e usar `Blob` + `URL.createObjectURL`)
- Nenhuma migração de banco necessária

