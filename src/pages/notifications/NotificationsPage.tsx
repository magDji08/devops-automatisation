import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Bell, Edit, Trash2, Send } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/spinner';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { notificationService } from '@/services';
import { TypeNotification, TypeNotificationLabels } from '@/types/enums';
import { formatDateTime } from '@/lib/utils';
import { mockNotifications } from '@/data/mockData';

export function NotificationsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        return await notificationService.getAll();
      } catch {
        return mockNotifications;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: notificationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setIsCreateDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: notificationService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const filteredNotifications = notifications?.filter((n) =>
    n.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      titre: formData.get('titre') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as TypeNotification,
    });
  };

  const getTypeColor = (type: TypeNotification) => {
    switch (type) {
      case TypeNotification.INFO: return 'bg-blue-100 text-blue-800';
      case TypeNotification.ALERTE_SECURITE: return 'bg-red-100 text-red-800';
      case TypeNotification.RAPPEL_EVENEMENT: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <Loading message="Chargement des notifications..." />;

  return (
    <div className="flex flex-col">
      <Header title="Notifications" subtitle="Gérez les notifications du Magal" />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Nouvelle notification</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une notification</DialogTitle>
                <DialogDescription>Envoyez une notification aux utilisateurs.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="titre">Titre</Label>
                    <Input id="titre" name="titre" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" defaultValue="INFO">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(TypeNotificationLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={4} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Annuler</Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? 'Création...' : 'Créer'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date d'envoi</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications?.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{notif.titre}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{notif.message}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(notif.type as TypeNotification)}>
                        {TypeNotificationLabels[notif.type as TypeNotification]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(notif.date_envoi)}</TableCell>
                    <TableCell>
                      <Badge variant={notif.envoyee ? 'success' : 'secondary'}>
                        {notif.envoyee ? 'Envoyée' : 'Brouillon'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!notif.envoyee && (
                          <Button variant="ghost" size="icon" title="Envoyer">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(notif.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredNotifications?.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucune notification</h3>
          </div>
        )}
      </div>
    </div>
  );
}
