
import { useState } from 'react';
import { 
  FileText, 
  User, 
  CheckCircle, 
  BarChart3, 
  Settings, 
  Home,
  Upload,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home, href: '/' },
  { id: 'declarations', label: 'Mes déclarations', icon: FileText, href: '/declarations' },
  { id: 'nouvelle-declaration', label: 'Nouvelle déclaration', icon: Upload, href: '/nouvelle-declaration' },
  { id: 'modele-excel', label: 'Modèle Excel', icon: Download, href: '/modele-excel' },
  { id: 'validations', label: 'Validations', icon: CheckCircle, href: '/validations', roles: ['agent_ses', 'chef_ses', 'dp'] },
  { id: 'rapports', label: 'Rapports', icon: BarChart3, href: '/rapports', roles: ['decompteur_ses', 'admin'] },
  { id: 'utilisateurs', label: 'Utilisateurs', icon: User, href: '/utilisateurs', roles: ['admin'] },
  { id: 'parametres', label: 'Paramètres', icon: Settings, href: '/parametres' },
];

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const userRole = 'employeur'; // This would come from auth context

  const filteredItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                isActive 
                  ? "bg-cnss-blue text-white shadow-md" 
                  : "text-cnss-gray hover:bg-cnss-blue-light hover:text-cnss-blue"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
