
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisateurs de test avec mots de passe
const testUsers: (User & { password: string })[] = [
  {
    id: 'emp1',
    fullName: 'Jean Mukendi',
    email: 'employeur@mukendi.cd',
    password: 'emp123456',
    role: 'employeur',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'agent1',
    fullName: 'Marie Kabongo',
    email: 'agent@cnss-kamina.cd',
    password: 'agent123',
    role: 'agent_ses',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'chef1',
    fullName: 'Paul Tshisekedi',
    email: 'chef@cnss-kamina.cd',
    password: 'chef123',
    role: 'chef_ses',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'dp1',
    fullName: 'Anne Mbuyi',
    email: 'dp@cnss-kamina.cd',
    password: 'dp123456',
    role: 'dp',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'prepose1',
    fullName: 'Claude Ilunga',
    email: 'prepose@cnss-kamina.cd',
    password: 'prepose123',
    role: 'prepose_ses',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'decomp1',
    fullName: 'Grace Mwanza',
    email: 'decompteur@cnss-kamina.cd',
    password: 'decomp123',
    role: 'decompteur_ses',
    status: 'actif',
    createdAt: new Date()
  },
  {
    id: 'admin1',
    fullName: 'Admin CNSS',
    email: 'admin@cnss-kamina.cd',
    password: 'admin2024',
    role: 'admin',
    status: 'actif',
    createdAt: new Date()
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const savedUser = localStorage.getItem('cnss_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulation de délai réseau
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const foundUser = testUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('cnss_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cnss_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
