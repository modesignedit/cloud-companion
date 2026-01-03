import { useState, useCallback } from 'react';

// Weather data interface matching OpenWeatherMap API response
export interface WeatherData {
  city: string;
  country: string;
  temperature: number; // in Celsius
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionCode: number;
  icon: string;
  description: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  clearError: () => void;
}

// OpenWeatherMap API configuration
// Using a free API key for demo purposes - in production, use environment variables
const API_KEY = '4d8fb5b93d4af21d66a2948710284366';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Custom hook for fetching weather data from OpenWeatherMap API
 * Handles loading states, error handling, and data transformation
 */
export const useWeather = (): UseWeatherReturn => {
  // State for weather data, loading status, and error messages
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches weather data for a given city
   * @param city - The city name to search for
   */
  const fetchWeather = useCallback(async (city: string) => {
    // Validate input
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    // Reset state and start loading
    setLoading(true);
    setError(null);

    try {
      // Construct API URL with query parameters
      // units=metric returns temperature in Celsius
      const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      
      // Make API request using async/await
      const response = await fetch(url);
      
      // Handle non-successful responses
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      // Parse JSON response
      const data = await response.json();

      // Transform API response to our WeatherData interface
      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        condition: data.weather[0].main,
        conditionCode: data.weather[0].id,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      };

      // Update state with fetched data
      setWeather(weatherData);
    } catch (err) {
      // Handle and display error messages
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setWeather(null);
    } finally {
      // Always stop loading indicator
      setLoading(false);
    }
  }, []);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { weather, loading, error, fetchWeather, clearError };
};
