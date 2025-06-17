
import { useState } from 'react';
import { 
  FileText, 
  User, 
  CheckCircle, 
  BarChart3, 
  Settings, 
  Home,
  Upload,
  Download,
  Users,
  Shield,
  Calendar,
  FileCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from './AuthProvider';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  roles?: string[];
  badge?: string;
  isNew?: boolean;
}

const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Tableau de bord', 
    icon: Home, 
    href: '/dashboard' 
  },
  { 
    id: 'declarations', 
    label: 'Mes déclarations', 
    icon: FileText, 
    href: '/declarations',
    roles: ['employeur']
  },
  { 
    id: 'nouvelle-declaration', 
    label: 'Nouvelle déclaration', 
    icon: Upload, 
    href: '/nouvelle-declaration',
    roles: ['employeur'],
    isNew: true
  },
  { 
    id: 'modele-excel', 
    label: 'Modèle Excel', 
    icon: Download, 
    href: '/modele-excel',
    roles: ['employeur']
  },
  { 
    id: 'validations', 
    label: 'Validations', 
    icon: CheckCircle, 
    href: '/validations', 
    roles: ['agent_ses', 'chef_ses', 'dp'],
    badge: '3'
  },
  { 
    id: 'traitements', 
    label: 'Traitements', 
    icon: FileCheck, 
    href: '/traitements',
    roles: ['prepose_ses']
  },
  { 
    id: 'rapports', 
    label: 'Rapports', 
    icon: BarChart3, 
    href: '/rapports', 
    roles: ['decompteur_ses', 'admin', 'dp', 'chef_ses']
  },
  { 
    id: 'etats-journaliers', 
    label: 'États journaliers', 
    icon: Calendar, 
    href: '/etats-journaliers',
    roles: ['decompteur_ses', 'admin']
  },
  { 
    id: 'utilisateurs', 
    label: 'Utilisateurs', 
    icon: Users, 
    href: '/utilisateurs', 
    roles: ['admin']
  },
  { 
    id: 'audit', 
    label: 'Audit & Logs', 
    icon: Shield, 
    href: '/audit',
    roles: ['admin']
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: TrendingUp, 
    href: '/analytics',
    roles: ['admin', 'dp', 'chef_ses']
  },
  { 
    id: 'activite', 
    label: 'Activité', 
    icon: Activity, 
    href: '/activite'
  },
  { 
    id: 'parametres', 
    label: 'Paramètres', 
    icon: Settings, 
    href: '/parametres' 
  },
];

export const ModernSidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const filteredItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role || '')
  );

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-cnss-gray-light border-r border-gray-200 transition-all duration-300 shadow-lg hidden md:block z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 space-y-2">
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-2 rounded-lg hover:bg-cnss-blue-light transition-colors text-cnss-gray"
        >
          <span className="text-xs">
            {isCollapsed ? '→' : '←'}
          </span>
        </button>

        {/* Menu items */}
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-cnss-blue to-cnss-blue-dark text-white shadow-lg transform scale-105" 
                    : "text-cnss-gray hover:bg-cnss-blue-light hover:text-cnss-blue hover:shadow-md"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive && "text-white"
                )} />
                
                {!isCollapsed && (
                  <>
                    <span className="font-medium flex-1">{item.label}</span>
                    
                    {/* Badges */}
                    <div className="flex items-center space-x-1">
                      {item.badge && (
                        <Badge className={cn(
                          "text-xs",
                          isActive ? "bg-white text-cnss-blue" : "bg-cnss-blue text-white"
                        )}>
                          {item.badge}
                        </Badge>
                      )}
                      {item.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                  </>
                )}
              </button>

              {/* Tooltip pour mode collapsed */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Informations utilisateur en bas (si non collapsed) */}
      {!isCollapsed && user && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-cnss-blue-light to-white p-3 rounded-xl border">
            <div className="text-xs text-cnss-gray">Connecté en tant que</div>
            <div className="text-sm font-medium text-cnss-blue truncate">
              {user.fullName}
            </div>
            <div className="text-xs text-cnss-gray capitalize">
              {user.role.replace('_', ' ')}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
