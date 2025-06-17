
import { FileText, Users, CheckCircle, Clock, TrendingUp, Download, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { ModernLayout } from '@/components/ModernLayout';
import { AdvancedStatsCard } from '@/components/AdvancedStatsCard';
import { DeclarationCard } from '@/components/DeclarationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Declaration } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { useNotifications } from '@/components/NotificationProvider';
import { useEffect } from 'react';

// Données de démonstration étendues
const mockDeclarations: Declaration[] = [
  {
    id: '1',
    employeurId: 'emp1',
    employeur: {
      id: 'emp1',
      fullName: 'Entreprise Mukendi SARL',
      email: 'contact@mukendi.cd',
      role: 'employeur',
      status: 'actif',
      createdAt: new Date()
    },
    mois: 'Novembre',
    annee: 2024,
    methodeDeclaration: 'formulaire',
    statut: 'validee',
    dateSubmission: new Date('2024-11-15'),
    travailleurs: [],
    totalSalaires: 2500000,
    totalCotisations: 375000
  },
  {
    id: '2',
    employeurId: 'emp1',
    employeur: {
      id: 'emp1',
      fullName: 'Entreprise Mukendi SARL',
      email: 'contact@mukendi.cd',
      role: 'employeur',
      status: 'actif',
      createdAt: new Date()
    },
    mois: 'Décembre',
    annee: 2024,
    methodeDeclaration: 'fichier_excel',
    statut: 'en_traitement',
    dateSubmission: new Date('2024-12-10'),
    travailleurs: [],
    totalSalaires: 2800000,
    totalCotisations: 420000
  }
];

export const ModernDashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const handleViewDeclaration = (id: string) => {
    console.log('Voir déclaration:', id);
    addNotification({
      title: 'Déclaration consultée',
      message: `Ouverture des détails de la déclaration ${id}`,
      type: 'info'
    });
  };

  // Simulation de notifications pour démonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.role === 'employeur') {
        addNotification({
          title: 'Rappel deadline',
          message: 'N\'oubliez pas de soumettre votre déclaration de janvier avant le 15',
          type: 'warning'
        });
      } else if (['agent_ses', 'chef_ses'].includes(user?.role || '')) {
        addNotification({
          title: 'Nouvelle déclaration',
          message: '3 nouvelles déclarations en attente de validation',
          type: 'info'
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, addNotification]);

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'employeur':
        return [
          {
            title: "Déclarations ce mois",
            value: "1",
            icon: <FileText className="h-6 w-6" />,
            trend: { value: 0, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Employés déclarés",
            value: "45",
            icon: <Users className="h-6 w-6" />,
            trend: { value: 5, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Cotisations estimées",
            value: "795K FC",
            icon: <DollarSign className="h-6 w-6" />,
            trend: { value: 12, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Statut compliance",
            value: "98%",
            icon: <CheckCircle className="h-6 w-6" />,
            trend: { value: 2, isPositive: true, period: "mois dernier" }
          }
        ];
      
      case 'agent_ses':
      case 'chef_ses':
      case 'dp':
        return [
          {
            title: "À valider",
            value: "23",
            icon: <Clock className="h-6 w-6" />,
            trend: { value: 15, isPositive: false, period: "hier" }
          },
          {
            title: "Validées aujourd'hui",
            value: "8",
            icon: <CheckCircle className="h-6 w-6" />,
            trend: { value: 25, isPositive: true, period: "hier" }
          },
          {
            title: "Employeurs actifs",
            value: "156",
            icon: <Users className="h-6 w-6" />,
            trend: { value: 3, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Rejetées",
            value: "2",
            icon: <AlertTriangle className="h-6 w-6" />,
            trend: { value: 50, isPositive: false, period: "hier" }
          }
        ];
      
      default:
        return [
          {
            title: "Utilisateurs totaux",
            value: "234",
            icon: <Users className="h-6 w-6" />,
            trend: { value: 8, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Déclarations mensuelles",
            value: "1,234",
            icon: <FileText className="h-6 w-6" />,
            trend: { value: 12, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Taux de validation",
            value: "94%",
            icon: <CheckCircle className="h-6 w-6" />,
            trend: { value: 2, isPositive: true, period: "mois dernier" }
          },
          {
            title: "Revenus CNSS",
            value: "45M FC",
            icon: <DollarSign className="h-6 w-6" />,
            trend: { value: 18, isPositive: true, period: "mois dernier" }
          }
        ];
    }
  };

  const stats = getStatsForRole();

  return (
    <ModernLayout>
      <div className="space-y-8">
        {/* En-tête avec salutation personnalisée */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cnss-blue to-cnss-blue-dark bg-clip-text text-transparent">
              Bonjour, {user?.fullName?.split(' ')[0]} 👋
            </h1>
            <p className="text-cnss-gray mt-2">
              {user?.role === 'employeur' 
                ? 'Gérez vos déclarations CNSS en toute simplicité'
                : 'Tableau de pilotage des déclarations CNSS Kamina'
              }
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-green-100 text-green-800">
                Système opérationnel
              </Badge>
              <Badge variant="outline">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Badge>
            </div>
          </div>
          
          {user?.role === 'employeur' && (
            <Button className="bg-gradient-to-r from-cnss-blue to-cnss-blue-dark hover:from-cnss-blue-dark hover:to-cnss-blue shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle déclaration
            </Button>
          )}
        </div>

        {/* Statistiques avec cartes améliorées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AdvancedStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              gradient={index === 0}
              animated={true}
            />
          ))}
        </div>

        {/* Barre de progression mensuelle (pour employeurs) */}
        {user?.role === 'employeur' && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-cnss-blue-light">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cnss-blue" />
                <span>Progression mensuelle</span>
              </CardTitle>
              <CardDescription>
                Suivi de vos obligations déclaratives pour janvier 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Déclarations soumises</span>
                  <span>0/1</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-sm text-cnss-gray">
                  Deadline : 15 janvier 2025 (14 jours restants)
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions rapides améliorées */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-cnss-blue" />
              <span>Actions rapides</span>
            </CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user?.role === 'employeur' ? (
                <>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-cnss-blue hover:text-white transition-all duration-300">
                    <FileText className="h-8 w-8 text-cnss-blue group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Nouvelle déclaration</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-green-500 hover:text-white transition-all duration-300">
                    <Download className="h-8 w-8 text-green-600 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Modèle Excel</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-purple-500 hover:text-white transition-all duration-300">
                    <CheckCircle className="h-8 w-8 text-purple-600 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Mes déclarations</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-cnss-blue hover:text-white transition-all duration-300">
                    <CheckCircle className="h-8 w-8 text-cnss-blue group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Validations</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <TrendingUp className="h-8 w-8 text-orange-600 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Rapports</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3 group hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Users className="h-8 w-8 text-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Utilisateurs</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Déclarations récentes (pour employeurs) */}
        {user?.role === 'employeur' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Déclarations récentes</CardTitle>
              <CardDescription>
                Vos dernières déclarations soumises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDeclarations.map((declaration) => (
                  <DeclarationCard
                    key={declaration.id}
                    declaration={declaration}
                    onView={handleViewDeclaration}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ModernLayout>
  );
};
