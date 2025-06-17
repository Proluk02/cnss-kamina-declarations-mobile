
import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useToast } from '@/hooks/use-toast';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulation de connexion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici vous intégreriez votre logique d'authentification
      console.log('Tentative de connexion:', { email, password });
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace CnssApp",
      });
      
      // Redirection vers le dashboard
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onLogin={handleLogin} isLoading={isLoading} />;
};
