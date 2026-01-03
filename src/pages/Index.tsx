import { useState } from 'react';
import { Cloud } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherSearch } from '@/components/weather/WeatherSearch';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherSkeleton } from '@/components/weather/WeatherSkeleton';
import { WeatherError } from '@/components/weather/WeatherError';
import { TemperatureToggle } from '@/components/weather/TemperatureToggle';

/**
 * Main weather application page
 * Features city search, temperature display, and unit toggle
 */
const Index = () => {
  // Temperature unit state - persists user preference
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  
  // Custom hook for weather data fetching and state management
  const { weather, loading, error, fetchWeather, clearError } = useWeather();

  return (
    <main className="min-h-screen weather-gradient">
      <div className="container mx-auto px-4 py-12">
        {/* Header section */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Cloud className="w-10 h-10 text-primary-foreground/90" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-shadow-lg">
              Weather App
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">
            Search for any city to get the current weather
          </p>
        </header>

        {/* Main content area */}
        <div className="flex flex-col items-center gap-8">
          {/* Search component */}
          <WeatherSearch onSearch={fetchWeather} loading={loading} />

          {/* Temperature unit toggle - only show when weather data exists */}
          {weather && !loading && (
            <div className="animate-fade-in">
              <TemperatureToggle unit={unit} onToggle={setUnit} />
            </div>
          )}

          {/* Error display */}
          {error && <WeatherError message={error} onDismiss={clearError} />}

          {/* Loading skeleton */}
          {loading && <WeatherSkeleton />}

          {/* Weather data display */}
          {weather && !loading && (
            <WeatherCard weather={weather} unit={unit} />
          )}

          {/* Empty state - shown before first search */}
          {!weather && !loading && !error && (
            <div className="text-center animate-fade-in mt-8">
              <Cloud className="w-24 h-24 text-primary-foreground/30 mx-auto mb-4" />
              <p className="text-primary-foreground/60 text-lg">
                Enter a city name to check the weather
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;
