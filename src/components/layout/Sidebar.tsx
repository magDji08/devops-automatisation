import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Users,
  Bell,
  BookOpen,
  User,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores';
import { useState } from 'react';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: Home },
  { name: 'Événements', href: '/evenements', icon: Calendar },
  { name: 'Lieux', href: '/lieux', icon: MapPin },
  { name: 'Inscriptions', href: '/inscriptions', icon: Users },
  { name: 'Histoires', href: '/histoires', icon: BookOpen },
  { name: 'Imams', href: '/imams', icon: User },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const adminNavigation = [
  { name: 'Utilisateurs', href: '/utilisateurs', icon: Users },
  { name: 'Paramètres', href: '/parametres', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'ADMIN';

  const NavLinks = () => (
    <>
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {isAdmin && (
        <div className="mt-6">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Administration
          </h3>
          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Moon className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold">Magal Events</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <NavLinks />
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {user?.prenom?.[0]}
                  {user?.nom?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
