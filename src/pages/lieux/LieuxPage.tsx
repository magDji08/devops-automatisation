import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, MapPin, Edit, Trash2, Eye } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { lieuService } from '@/services';
import { CategorieLieu, CategorieLieuLabels } from '@/types/enums';
import { mockLieux } from '@/data/mockData';

export function LieuxPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch lieux with mock fallback
  const { data: lieux, isLoading } = useQuery({
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
    mutationFn: lieuService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lieux'] });
      setIsCreateDialogOpen(false);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: lieuService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lieux'] });
    },
  });

  // Filter lieux
  const filteredLieux = lieux?.filter((lieu) => {
    const matchesSearch = lieu.nom.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategorie = selectedCategorie === 'all' || lieu.categorie === selectedCategorie;
    return matchesSearch && matchesCategorie;
  });

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      nom: formData.get('nom') as string,
      categorie: formData.get('categorie') as CategorieLieu,
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
      description: formData.get('description') as string,
      adresse: formData.get('adresse') as string,
    });
  };

  const getCategorieColor = (categorie: CategorieLieu) => {
    switch (categorie) {
      case CategorieLieu.GRANDE_MOSQUEE:
        return 'bg-green-100 text-green-800';
      case CategorieLieu.RESIDENCE:
        return 'bg-blue-100 text-blue-800';
      case CategorieLieu.DAARA:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <Loading message="Chargement des lieux..." />;
  }

  return (
    <div className="flex flex-col">
      <Header 
        title="Lieux"
        subtitle="Gérez les lieux du Magal"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un lieu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategorie} onValueChange={setSelectedCategorie}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {Object.entries(CategorieLieuLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau lieu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un lieu</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour ajouter un nouveau lieu.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" name="nom" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select name="categorie" defaultValue="AUTRE">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CategorieLieuLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" name="latitude" type="number" step="any" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" name="longitude" type="number" step="any" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input id="adresse" name="adresse" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} />
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

        {/* Lieux Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Coordonnées</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLieux?.map((lieu) => (
                  <TableRow key={lieu.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{lieu.nom}</div>
                          {lieu.description && (
                            <div className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                              {lieu.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategorieColor(lieu.categorie as CategorieLieu)}>
                        {CategorieLieuLabels[lieu.categorie as CategorieLieu]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {lieu.adresse || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono text-muted-foreground">
                        {lieu.latitude.toFixed(4)}, {lieu.longitude.toFixed(4)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lieu.actif ? 'success' : 'secondary'}>
                        {lieu.actif ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteMutation.mutate(lieu.id)}
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

        {filteredLieux?.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucun lieu trouvé</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Essayez de modifier vos critères de recherche' : 'Ajoutez votre premier lieu'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
