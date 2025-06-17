
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const Index = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('Page d\'accueil chargée');
  }, []);

  // Rediriger vers le dashboard si connecté, sinon vers login
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Index;
