
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}

export type UserRole = 'employeur' | 'agent_ses' | 'chef_ses' | 'dp' | 'prepose_ses' | 'decompteur_ses' | 'admin';

export type UserStatus = 'actif' | 'inactif';

export interface Declaration {
  id: string;
  employeurId: string;
  employeur: User;
  mois: string;
  annee: number;
  methodeDeclaration: 'formulaire' | 'fichier_excel';
  fichierExcel?: string;
  statut: DeclarationStatus;
  dateSubmission: Date;
  travailleurs: Travailleur[];
  totalSalaires: number;
  totalCotisations: number;
}

export type DeclarationStatus = 'soumise' | 'en_traitement' | 'validee' | 'rejetee';

export interface Travailleur {
  id: string;
  declarationId: string;
  nom: string;
  matricule: string;
  numeroCNSS: string;
  salaire: number;
  heuresPrestees: number;
  joursPrestees: number;
}

export interface Validation {
  id: string;
  declarationId: string;
  validePar: string;
  dateValidation: Date;
  commentaire?: string;
  decision: 'validee' | 'rejetee' | 'a_corriger';
}

export interface FicheCotisant {
  id: string;
  declarationId: string;
  totalSalaires: number;
  cotisationTotale: number;
  lienPDF: string;
  dateGeneration: Date;
}

export interface EtatJournalier {
  id: string;
  date: Date;
  nombreDeclarations: number;
  totalMontantsCotises: number;
  rapportPDF: string;
}
