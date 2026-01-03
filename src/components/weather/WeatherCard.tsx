import { Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '@/hooks/useWeather';
import { WeatherIcon } from './WeatherIcon';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

/**
 * Main weather display card component
 * Shows temperature, condition, and additional weather details
 */
export const WeatherCard = ({ weather, unit }: WeatherCardProps) => {
  /**
   * Convert temperature based on selected unit
   * Celsius to Fahrenheit: (C × 9/5) + 32
   */
  const convertTemp = (celsius: number): number => {
    if (unit === 'fahrenheit') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  // Get display temperature and unit symbol
  const displayTemp = convertTemp(weather.temperature);
  const feelsLikeTemp = convertTemp(weather.feelsLike);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Main weather card with glass morphism effect */}
      <div className="glass-card rounded-2xl p-8 shadow-glass-lg">
        {/* Location header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {weather.city}
          </h2>
          <p className="text-muted-foreground text-sm">
            {weather.country}
          </p>
        </div>

        {/* Temperature and icon section */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Weather icon */}
          <WeatherIcon 
            conditionCode={weather.conditionCode} 
            className="w-20 h-20"
          />
          
          {/* Temperature display */}
          <div className="text-center">
            <span className="text-6xl font-light text-foreground tracking-tight">
              {displayTemp}
            </span>
            <span className="text-2xl text-muted-foreground ml-1">
              {unitSymbol}
            </span>
          </div>
        </div>

        {/* Weather condition description */}
        <p className="text-center text-lg capitalize text-foreground/80 mb-8">
          {weather.description}
        </p>

        {/* Additional weather details grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Feels like */}
          <WeatherDetail
            icon={<Thermometer className="w-5 h-5" />}
            label="Feels like"
            value={`${feelsLikeTemp}${unitSymbol}`}
          />
          
          {/* Humidity */}
          <WeatherDetail
            icon={<Droplets className="w-5 h-5" />}
            label="Humidity"
            value={`${weather.humidity}%`}
          />
          
          {/* Wind speed */}
          <WeatherDetail
            icon={<Wind className="w-5 h-5" />}
            label="Wind"
            value={`${weather.windSpeed} km/h`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Individual weather detail component
 * Used for feels like, humidity, and wind speed
 */
interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetail = ({ icon, label, value }: WeatherDetailProps) => (
  <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
    <div className="text-primary">{icon}</div>
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);
