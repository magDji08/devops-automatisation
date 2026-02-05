import { Calendar, MapPin, Users, Bell, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';
import { mockEvenements, mockLieux, mockHistoires, mockInscriptions, mockNotifications } from '@/data/mockData';
import { formatDateTime } from '@/lib/utils';
import { TypeEvenement, TypeEvenementLabels } from '@/types/enums';

export function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Événements',
      value: mockEvenements.length.toString(),
      description: 'Événements actifs',
      icon: Calendar,
      trend: '+12%',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Inscriptions',
      value: mockInscriptions.length.toString(),
      description: 'Total inscriptions',
      icon: Users,
      trend: '+23%',
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Lieux',
      value: mockLieux.length.toString(),
      description: 'Lieux enregistrés',
      icon: MapPin,
      trend: '+5%',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Notifications',
      value: mockNotifications.length.toString(),
      description: 'Envoyées ce mois',
      icon: Bell,
      trend: '+18%',
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  return (
    <div className="flex flex-col">
      <Header 
        title={`Bienvenue, ${user?.prenom || 'Utilisateur'} !`}
        subtitle="Voici un aperçu de votre tableau de bord"
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {stat.trend}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Events */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>Les prochains événements du Magal</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvenements.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.titre}</h4>
                        <Badge variant={
                          event.type === TypeEvenement.CEREMONIE ? 'default' :
                          event.type === TypeEvenement.CONFERENCE ? 'secondary' : 'outline'
                        }>
                          {TypeEvenementLabels[event.type]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDateTime(event.date_heure_debut)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.lieu.nom}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.nb_places_max} places
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Stories */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histoires récentes</CardTitle>
                  <CardDescription>Récits du Magal</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistoires.slice(0, 2).map((histoire) => (
                  <div
                    key={histoire.id}
                    className="space-y-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <BookOpen className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium leading-tight">{histoire.titre}</h4>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {histoire.contenu.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Lire la suite →
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
