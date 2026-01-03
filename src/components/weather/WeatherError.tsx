import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherErrorProps {
  message: string;
  onDismiss: () => void;
}

/**
 * Error display component for weather fetch failures
 * Shows error message with dismiss button
 */
export const WeatherError = ({ message, onDismiss }: WeatherErrorProps) => {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
        {/* Error icon */}
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        
        {/* Error message */}
        <p className="flex-1 text-sm text-destructive">
          {message}
        </p>
        
        {/* Dismiss button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
