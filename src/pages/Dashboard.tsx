
import { FileText, Users, CheckCircle, Clock, TrendingUp, Download } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { StatsCard } from '@/components/StatsCard';
import { DeclarationCard } from '@/components/DeclarationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Declaration } from '@/types';

// Données de démonstration
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

export const Dashboard = () => {
  const handleViewDeclaration = (id: string) => {
    console.log('Voir déclaration:', id);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-cnss-gray">Bienvenue sur votre espace de déclarations CNSS</p>
          </div>
          <Button className="bg-cnss-blue hover:bg-cnss-blue-dark">
            <FileText className="h-4 w-4 mr-2" />
            Nouvelle déclaration
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Déclarations ce mois"
            value="1"
            icon={<FileText className="h-6 w-6" />}
            trend={{ value: 0, isPositive: true }}
          />
          <StatsCard
            title="Employés déclarés"
            value="45"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Déclarations validées"
            value="11"
            icon={<CheckCircle className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="En attente"
            value="1"
            icon={<Clock className="h-6 w-6" />}
          />
        </div>

        {/* Actions rapides */}
        <Card>
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
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <FileText className="h-6 w-6 text-cnss-blue" />
                <span>Nouvelle déclaration</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Download className="h-6 w-6 text-cnss-blue" />
                <span>Télécharger modèle Excel</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <CheckCircle className="h-6 w-6 text-cnss-blue" />
                <span>Voir mes déclarations</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Déclarations récentes */}
        <Card>
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
      </div>
    </Layout>
  );
};
