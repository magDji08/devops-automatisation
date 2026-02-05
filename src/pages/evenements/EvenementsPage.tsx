import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, MoreVertical, Calendar, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { evenementService, lieuService } from '@/services';
import { TypeEvenement, TypeEvenementLabels } from '@/types/enums';
import { formatDateTime } from '@/lib/utils';
import { mockEvenements, mockLieux } from '@/data/mockData';

export function EvenementsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch events with mock fallback
  const { data: evenements, isLoading } = useQuery({
    queryKey: ['evenements'],
    queryFn: async () => {
      try {
        return await evenementService.getAll();
      } catch {
        return mockEvenements;
      }
    },
  });

  // Fetch lieux for the form with mock fallback
  const { data: lieux } = useQuery({
    queryKey: ['lieux'],
    queryFn: async () => {
      try {
        return await lieuService.getAll();
      } catch {
        return mockLieux;
      }
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: evenementService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
      setIsCreateDialogOpen(false);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: evenementService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
    },
  });

  // Filter events
  const filteredEvenements = evenements?.filter((event) => {
    const matchesSearch = event.titre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      titre: formData.get('titre') as string,
      description: formData.get('description') as string,
      date_heure_debut: formData.get('date_heure_debut') as string,
      date_heure_fin: formData.get('date_heure_fin') as string,
      nb_places_max: parseInt(formData.get('nb_places_max') as string) || 0,
      type: formData.get('type') as TypeEvenement,
      lieu_id: parseInt(formData.get('lieu_id') as string),
    });
  };

  if (isLoading) {
    return <Loading message="Chargement des événements..." />;
  }

  return (
    <div className="flex flex-col">
      <Header 
        title="Événements"
        subtitle="Gérez les événements du Magal"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type d'événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {Object.entries(TypeEvenementLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvel événement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un événement</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouvel événement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="titre">Titre</Label>
                    <Input id="titre" name="titre" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date_heure_debut">Date et heure de début</Label>
                      <Input id="date_heure_debut" name="date_heure_debut" type="datetime-local" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date_heure_fin">Date et heure de fin</Label>
                      <Input id="date_heure_fin" name="date_heure_fin" type="datetime-local" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" defaultValue="CEREMONIE">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TypeEvenementLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="nb_places_max">Nombre de places max</Label>
                      <Input id="nb_places_max" name="nb_places_max" type="number" min="0" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lieu_id">Lieu</Label>
                    <Select name="lieu_id" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieux?.map((lieu) => (
                          <SelectItem key={lieu.id} value={lieu.id.toString()}>
                            {lieu.nom}
                          </SelectItem>
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

        {/* Tabs for view modes */}
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grille</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvenements?.map((event) => (
                <Card key={event.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-primary/40" />
                    </div>
                    <Badge className="absolute top-3 right-3">
                      {TypeEvenementLabels[event.type as TypeEvenement]}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{event.titre}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {event.description || 'Aucune description'}
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDateTime(event.date_heure_debut)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.lieu?.nom}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.nb_places_max} places</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(event.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredEvenements?.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{event.titre}</h4>
                          <Badge variant="outline">
                            {TypeEvenementLabels[event.type as TypeEvenement]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(event.date_heure_debut)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.lieu?.nom}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredEvenements?.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucun événement trouvé</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Essayez de modifier vos critères de recherche' : 'Créez votre premier événement'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
