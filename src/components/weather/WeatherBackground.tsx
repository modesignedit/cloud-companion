import { cn } from '@/lib/utils';

interface WeatherBackgroundProps {
  conditionCode: number | null;
  children: React.ReactNode;
}

/**
 * Dynamic background component that changes based on weather conditions
 * Uses gradient overlays and subtle animations for atmosphere
 */
export const WeatherBackground = ({ conditionCode, children }: WeatherBackgroundProps) => {
  // Determine background style based on weather condition code
  const getBackgroundClass = () => {
    if (!conditionCode) return 'bg-default';
    
    // 2xx: Thunderstorm - dark purple/grey
    if (conditionCode >= 200 && conditionCode < 300) return 'bg-storm';
    
    // 3xx: Drizzle - soft grey/blue
    if (conditionCode >= 300 && conditionCode < 400) return 'bg-drizzle';
    
    // 5xx: Rain - deep blue/grey
    if (conditionCode >= 500 && conditionCode < 600) return 'bg-rain';
    
    // 6xx: Snow - light blue/white
    if (conditionCode >= 600 && conditionCode < 700) return 'bg-snow';
    
    // 7xx: Atmosphere (fog, mist) - muted grey
    if (conditionCode >= 700 && conditionCode < 800) return 'bg-fog';
    
    // 800: Clear sky - bright blue/orange sunset
    if (conditionCode === 800) return 'bg-clear';
    
    // 801-804: Cloudy - soft grey/blue
    if (conditionCode > 800) return 'bg-cloudy';
    
    return 'bg-default';
  };

  return (
    <div className={cn(
      'min-h-screen transition-all duration-1000 ease-in-out relative overflow-hidden',
      getBackgroundClass()
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs for depth */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Subtle moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
