
import { Bell, User, LogOut, Settings, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from './AuthProvider';
import { useNotifications } from './NotificationProvider';
import { useState } from 'react';

export const ModernHeader = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      employeur: 'Employeur',
      agent_ses: 'Agent SES',
      chef_ses: 'Chef SES',
      dp: 'Directeur Provincial',
      prepose_ses: 'Préposé SES',
      decompteur_ses: 'Décompteur SES',
      admin: 'Administrateur'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo et marque */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cnss-blue to-cnss-blue-dark rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cnss-blue to-cnss-blue-dark bg-clip-text text-transparent">
                CnssApp
              </h1>
              <p className="text-xs text-cnss-gray hidden md:block">
                CNSS Kamina - RDC
              </p>
            </div>
          </div>
        </div>

        {/* Barre de recherche (masquée sur mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cnss-gray" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-cnss-gray-light border-0 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Actions et profil */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px]">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-center text-cnss-gray py-8">Aucune notification</p>
                ) : (
                  notifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-cnss-blue-light border-cnss-blue' : 'bg-white'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-cnss-gray mt-1">{notification.message}</p>
                      <p className="text-xs text-cnss-gray mt-2">
                        {notification.timestamp.toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cnss-blue to-cnss-blue-dark rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-cnss-gray">{getRoleDisplayName(user?.role || '')}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
