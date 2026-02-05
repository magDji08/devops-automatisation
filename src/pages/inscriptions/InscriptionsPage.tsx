import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Users, Calendar, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { inscriptionService, evenementService, userService } from '@/services';
import { StatutInscription, StatutInscriptionLabels } from '@/types/enums';
import { formatDateTime } from '@/lib/utils';

export function InscriptionsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Récupérer les inscriptions depuis l'API
  const { data: inscriptions, isLoading } = useQuery({
    queryKey: ['inscriptions'],
    queryFn: () => inscriptionService.getAll(),
  });

  // Récupérer les événements depuis l'API
  const { data: evenements } = useQuery({
    queryKey: ['evenements'],
    queryFn: () => evenementService.getAll(),
  });

  // Récupérer les utilisateurs depuis l'API
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: inscriptionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
      setIsCreateDialogOpen(false);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: inscriptionService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
    },
  });

  // Update status mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, statut }: { id: number; statut: StatutInscription }) =>
      inscriptionService.update(id, { statut }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
    },
  });

  // Filter inscriptions
  const filteredInscriptions = inscriptions?.filter((inscription) => {
    const matchesSearch =
      inscription.user?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.user?.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.evenement?.titre?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut = selectedStatut === 'all' || inscription.statut === selectedStatut;
    return matchesSearch && matchesStatut;
  });

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      user_id: parseInt(formData.get('user_id') as string),
      evenement_id: parseInt(formData.get('evenement_id') as string),
      statut: formData.get('statut') as StatutInscription,
    });
  };

  const getStatutBadge = (statut: StatutInscription) => {
    switch (statut) {
      case StatutInscription.INSCRIT:
        return <Badge variant="info"><Clock className="mr-1 h-3 w-3" />Inscrit</Badge>;
      case StatutInscription.PRESENT:
        return <Badge variant="success"><CheckCircle className="mr-1 h-3 w-3" />Présent</Badge>;
      case StatutInscription.ANNULE:
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Annulé</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  if (isLoading) {
    return <Loading message="Chargement des inscriptions..." />;
  }

  return (
    <div className="flex flex-col">
      <Header 
        title="Inscriptions"
        subtitle="Gérez les inscriptions aux événements"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inscriptions?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {inscriptions?.filter(i => i.statut === StatutInscription.INSCRIT).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Inscrits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {inscriptions?.filter(i => i.statut === StatutInscription.PRESENT).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Présents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {inscriptions?.filter(i => i.statut === StatutInscription.ANNULE).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Annulés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedStatut} onValueChange={setSelectedStatut}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(StatutInscriptionLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle inscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvelle inscription</DialogTitle>
                <DialogDescription>
                  Inscrire un utilisateur à un événement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user_id">Utilisateur</Label>
                    <Select name="user_id" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un utilisateur" />
                      </SelectTrigger>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.prenom} {user.nom} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="evenement_id">Événement</Label>
                    <Select name="evenement_id" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un événement" />
                      </SelectTrigger>
                      <SelectContent>
                        {evenements?.map((event) => (
                          <SelectItem key={event.id} value={event.id.toString()}>
                            {event.titre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="statut">Statut</Label>
                    <Select name="statut" defaultValue="INSCRIT">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(StatutInscriptionLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? 'Création...' : 'Créer'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Inscriptions Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Événement</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInscriptions?.map((inscription) => (
                  <TableRow key={inscription.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                          {inscription.user?.prenom?.[0]}{inscription.user?.nom?.[0]}
                        </div>
                        <div>
                          <div className="font-medium">
                            {inscription.user?.prenom} {inscription.user?.nom}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {inscription.user?.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{inscription.evenement?.titre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDateTime(inscription.date_inscription)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatutBadge(inscription.statut)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Select
                          value={inscription.statut}
                          onValueChange={(value) =>
                            updateMutation.mutate({ id: inscription.id, statut: value as StatutInscription })
                          }
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(StatutInscriptionLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(inscription.id)}
                        >
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

        {filteredInscriptions?.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucune inscription trouvée</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Essayez de modifier vos critères de recherche' : 'Créez votre première inscription'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
