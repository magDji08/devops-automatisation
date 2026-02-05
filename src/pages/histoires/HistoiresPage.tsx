import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, BookOpen, Edit, Trash2, Play, Image } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { histoireService } from '@/services';
import { mockHistoires } from '@/data/mockData';

export function HistoiresPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedHistoire, setSelectedHistoire] = useState<number | null>(null);

  // Fetch histoires with fallback to mock data
  const { data: histoires, isLoading } = useQuery({
    queryKey: ['histoires'],
    queryFn: async () => {
      try {
        return await histoireService.getAll();
      } catch {
        return mockHistoires;
      }
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: histoireService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['histoires'] });
      setIsCreateDialogOpen(false);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: histoireService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['histoires'] });
    },
  });

  // Filter histoires
  const filteredHistoires = histoires?.filter((histoire) => {
    return histoire.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
           histoire.contenu.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      titre: formData.get('titre') as string,
      contenu: formData.get('contenu') as string,
      audio_url: formData.get('audio_url') as string || undefined,
      image_url: formData.get('image_url') as string || undefined,
      ordre_affichage: parseInt(formData.get('ordre_affichage') as string) || 0,
    });
  };

  if (isLoading) {
    return <Loading message="Chargement des histoires..." />;
  }

  return (
    <div className="flex flex-col">
      <Header 
        title="Histoires du Magal"
        subtitle="Récits et histoire de Cheikh Ahmadou Bamba"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une histoire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle histoire
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une histoire</DialogTitle>
                <DialogDescription>
                  Partagez un récit sur l'histoire du Magal et de Cheikh Ahmadou Bamba.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="titre">Titre</Label>
                    <Input id="titre" name="titre" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contenu">Contenu</Label>
                    <Textarea id="contenu" name="contenu" rows={6} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="image_url">URL de l'image (optionnel)</Label>
                      <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="audio_url">URL audio (optionnel)</Label>
                      <Input id="audio_url" name="audio_url" type="url" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ordre_affichage">Ordre d'affichage</Label>
                    <Input id="ordre_affichage" name="ordre_affichage" type="number" defaultValue="0" />
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

        {/* Histoires Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHistoires?.map((histoire) => (
            <Card key={histoire.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-50 relative flex items-center justify-center">
                {histoire.image_url ? (
                  <img 
                    src={histoire.image_url} 
                    alt={histoire.titre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="h-16 w-16 text-amber-300" />
                )}
                {histoire.audio_url && (
                  <div className="absolute bottom-3 right-3">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{histoire.titre}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    #{histoire.ordre_affichage}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {histoire.contenu}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {histoire.image_url && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Image className="h-3 w-3" />
                      Image
                    </div>
                  )}
                  {histoire.audio_url && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Play className="h-3 w-3" />
                      Audio
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedHistoire(histoire.id)}
                  >
                    Lire plus
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => deleteMutation.mutate(histoire.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistoires?.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Aucune histoire trouvée</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Essayez de modifier vos critères de recherche' : 'Ajoutez votre première histoire'}
            </p>
          </div>
        )}

        {/* Detail Dialog */}
        {selectedHistoire && (
          <Dialog open={!!selectedHistoire} onOpenChange={() => setSelectedHistoire(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              {(() => {
                const histoire = histoires?.find(h => h.id === selectedHistoire);
                if (!histoire) return null;
                return (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{histoire.titre}</DialogTitle>
                    </DialogHeader>
                    {histoire.image_url && (
                      <img 
                        src={histoire.image_url} 
                        alt={histoire.titre}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{histoire.contenu}</p>
                    </div>
                    {histoire.audio_url && (
                      <div className="mt-4">
                        <audio controls className="w-full">
                          <source src={histoire.audio_url} />
                        </audio>
                      </div>
                    )}
                  </>
                );
              })()}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
