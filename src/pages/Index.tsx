
import { useEffect } from 'react';
import { Login } from './Login';

const Index = () => {
  useEffect(() => {
    // Ici vous pourriez vérifier si l'utilisateur est déjà connecté
    // et le rediriger vers le dashboard si nécessaire
    console.log('Page d\'accueil chargée');
  }, []);

  return <Login />;
};

export default Index;
