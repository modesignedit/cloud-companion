import { useState, FormEvent, forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

/**
 * Search component for weather city lookup
 * Features form submission handling and loading state
 */
export const WeatherSearch = forwardRef<HTMLFormElement, WeatherSearchProps>(
  ({ onSearch, loading = false }, ref) => {
    // Local state for input value
    const [city, setCity] = useState('');

    /**
     * Handle form submission
     * Prevents default form behavior and triggers search callback
     */
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (city.trim()) {
        onSearch(city.trim());
      }
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative flex gap-2">
          {/* City input field with glass morphism styling */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-10 h-12 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl 
                         focus:ring-2 focus:ring-primary/30 transition-all duration-200
                         placeholder:text-muted-foreground/70"
              disabled={loading}
              aria-label="City name"
            />
          </div>
          
          {/* Search button with loading state */}
          <Button 
            type="submit" 
            disabled={loading || !city.trim()}
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 
                       transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>
    );
  }
);

WeatherSearch.displayName = 'WeatherSearch';
