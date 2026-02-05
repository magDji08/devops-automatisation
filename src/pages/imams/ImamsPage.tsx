import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, User, Edit, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loading } from '@/components/ui/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { imamService } from '@/services';
import { mockImams } from '@/data/mockData';

export function ImamsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: imams, isLoading } = useQuery({
    queryKey: ['imams'],
    queryFn: async () => {
      try {
        return await imamService.getAll();
      } catch {
        return mockImams;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: imamService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imams'] });
      setIsCreateDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: imamService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['imams'] }),
  });

  const filteredImams = imams?.filter((i) =>
    i.nom_complet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      nom_complet: formData.get('nom_complet') as string,
      biographie: formData.get('biographie') as string,
      photo_url: formData.get('photo_url') as string,
      periode: formData.get('periode') as string,
    });
  };

  if (isLoading) return <Loading message="Chargement des imams..." />;

  return (
    <div className="flex flex-col">
      <Header title="Imams" subtitle="Guides spirituels du Magal" />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un imam..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Nouvel imam</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un imam</DialogTitle>
                <DialogDescription>Ajoutez un nouveau guide spirituel.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom_complet">Nom complet</Label>
                    <Input id="nom_complet" name="nom_complet" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="periode">Période (ex: 1927-2007)</Label>
                    <Input id="periode" name="periode" placeholder="1927-2007" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="photo_url">URL Photo</Label>
                    <Input id="photo_url" name="photo_url" type="url" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="biographie">Biographie</Label>
                    <Textarea id="biographie" name="biographie" rows={4} />
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImams?.map((imam) => (
            <Card key={imam.id} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={imam.photo_url} />
                  <AvatarFallback className="text-2xl">{imam.nom_complet.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mt-4">{imam.nom_complet}</h3>
                {imam.periode && <p className="text-sm text-muted-foreground">{imam.periode}</p>}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{imam.biographie || 'Aucune biographie'}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(imam.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImams?.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucun imam trouvé</h3>
          </div>
        )}
      </div>
    </div>
  );
}
