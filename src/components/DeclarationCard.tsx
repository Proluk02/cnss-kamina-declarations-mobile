
import { FileText, Calendar, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Declaration } from '@/types';
import { cn } from '@/lib/utils';

interface DeclarationCardProps {
  declaration: Declaration;
  onView: (id: string) => void;
}

const getStatusBadge = (status: Declaration['statut']) => {
  const statusConfig = {
    soumise: { label: 'Soumise', className: 'bg-blue-100 text-blue-800' },
    en_traitement: { label: 'En traitement', className: 'bg-yellow-100 text-yellow-800' },
    validee: { label: 'Validée', className: 'bg-green-100 text-green-800' },
    rejetee: { label: 'Rejetée', className: 'bg-red-100 text-red-800' }
  };

  const config = statusConfig[status];
  return (
    <Badge className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
};

export const DeclarationCard = ({ declaration, onView }: DeclarationCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cnss-blue-light rounded-lg">
            <FileText className="h-5 w-5 text-cnss-blue" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Déclaration {declaration.mois} {declaration.annee}
            </h3>
            <p className="text-sm text-cnss-gray flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              Soumise le {declaration.dateSubmission.toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        {getStatusBadge(declaration.statut)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-cnss-gray" />
          <span className="text-sm text-cnss-gray">
            {declaration.travailleurs.length} employés
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-cnss-gray" />
          <span className="text-sm text-cnss-gray">
            {declaration.totalSalaires.toLocaleString('fr-FR')} FC
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-cnss-gray">Cotisation estimée: </span>
          <span className="font-semibold text-cnss-blue">
            {declaration.totalCotisations.toLocaleString('fr-FR')} FC
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(declaration.id)}
          className="border-cnss-blue text-cnss-blue hover:bg-cnss-blue hover:text-white"
        >
          Voir détails
        </Button>
      </div>
    </div>
  );
};
