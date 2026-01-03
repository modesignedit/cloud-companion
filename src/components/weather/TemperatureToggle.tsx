import { cn } from '@/lib/utils';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: (unit: 'celsius' | 'fahrenheit') => void;
}

/**
 * Toggle component for switching between Celsius and Fahrenheit
 * Uses a pill-style toggle with smooth transition
 */
export const TemperatureToggle = ({ unit, onToggle }: TemperatureToggleProps) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-secondary/80 backdrop-blur-sm rounded-full">
      {/* Celsius button */}
      <button
        onClick={() => onToggle('celsius')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
          unit === 'celsius'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={unit === 'celsius'}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      
      {/* Fahrenheit button */}
      <button
        onClick={() => onToggle('fahrenheit')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
          unit === 'fahrenheit'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={unit === 'fahrenheit'}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};
