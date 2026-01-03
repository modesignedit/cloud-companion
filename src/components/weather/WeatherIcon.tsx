import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle,
  Wind,
  Cloudy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  conditionCode: number;
  className?: string;
  animated?: boolean;
}

/**
 * Renders appropriate weather icon based on OpenWeatherMap condition code
 * Condition codes: https://openweathermap.org/weather-conditions
 */
export const WeatherIcon = ({ conditionCode, className, animated = true }: WeatherIconProps) => {
  // Determine icon size and animation classes
  const iconClasses = cn(
    'text-foreground',
    animated && 'weather-icon-bounce',
    className
  );

  // Map condition codes to appropriate icons
  // 2xx: Thunderstorm
  if (conditionCode >= 200 && conditionCode < 300) {
    return <CloudLightning className={iconClasses} />;
  }
  
  // 3xx: Drizzle
  if (conditionCode >= 300 && conditionCode < 400) {
    return <CloudDrizzle className={iconClasses} />;
  }
  
  // 5xx: Rain
  if (conditionCode >= 500 && conditionCode < 600) {
    return <CloudRain className={iconClasses} />;
  }
  
  // 6xx: Snow
  if (conditionCode >= 600 && conditionCode < 700) {
    return <CloudSnow className={iconClasses} />;
  }
  
  // 7xx: Atmosphere (fog, mist, haze, etc.)
  if (conditionCode >= 700 && conditionCode < 800) {
    if (conditionCode === 781) {
      // Tornado
      return <Wind className={iconClasses} />;
    }
    return <CloudFog className={iconClasses} />;
  }
  
  // 800: Clear sky
  if (conditionCode === 800) {
    return <Sun className={cn(iconClasses, 'text-accent')} />;
  }
  
  // 801-804: Clouds
  if (conditionCode > 800 && conditionCode < 805) {
    if (conditionCode === 801) {
      // Few clouds
      return <Cloud className={iconClasses} />;
    }
    return <Cloudy className={iconClasses} />;
  }

  // Default fallback
  return <Cloud className={iconClasses} />;
};
