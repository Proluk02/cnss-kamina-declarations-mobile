
import { User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cnss-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-cnss-blue">CnssApp</h1>
              <p className="text-xs text-cnss-gray hidden md:block">
                Caisse Nationale de Sécurité Sociale - Kamina
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <User className="h-4 w-4 text-cnss-gray" />
            <span className="text-cnss-gray">Jean Mukendi</span>
            <span className="text-xs bg-cnss-blue-light text-cnss-blue px-2 py-1 rounded">
              Employeur
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-cnss-gray hover:text-red-600">
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Déconnexion</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
