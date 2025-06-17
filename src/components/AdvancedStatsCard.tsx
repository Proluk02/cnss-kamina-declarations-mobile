
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AdvancedStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    period?: string;
  };
  className?: string;
  gradient?: boolean;
  animated?: boolean;
}

export const AdvancedStatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  gradient = false,
  animated = true
}: AdvancedStatsCardProps) => {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      gradient 
        ? "bg-gradient-to-br from-white via-cnss-blue-light to-white" 
        : "bg-white",
      animated && "hover:scale-105",
      className
    )}>
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-cnss-gray mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          
          {trend && (
            <div className={cn(
              "flex items-center space-x-1 text-sm",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(trend.value)}%</span>
              {trend.period && (
                <span className="text-cnss-gray">vs {trend.period}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="p-4 bg-gradient-to-br from-cnss-blue to-cnss-blue-dark rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <div className="text-white group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
          
          {/* Pulse effect */}
          {animated && (
            <div className="absolute inset-0 bg-cnss-blue rounded-2xl animate-ping opacity-20"></div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cnss-blue/10 to-transparent rounded-full transform translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cnss-blue/5 to-transparent rounded-full transform -translate-x-8 translate-y-8"></div>
    </div>
  );
};
