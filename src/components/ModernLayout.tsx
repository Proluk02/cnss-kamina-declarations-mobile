
import { ReactNode } from 'react';
import { ModernSidebar } from './ModernSidebar';
import { ModernHeader } from './ModernHeader';

interface ModernLayoutProps {
  children: ReactNode;
}

export const ModernLayout = ({ children }: ModernLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cnss-gray-light">
      <ModernHeader />
      <div className="flex">
        <ModernSidebar />
        <main className="flex-1 p-6 ml-0 md:ml-64 mt-16 transition-all duration-300">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
