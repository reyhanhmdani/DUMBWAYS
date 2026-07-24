import { useState, useEffect } from "react";
import { fetchWeather } from "../api/wethear";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function WeatherApp() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const debounceCity = useDebounce(cityInput, 500);

  useEffect(() => {
    if (debounceCity) {
      setLoading(true);
      fetchWeather(debounceCity)
        .then((data) => setWeatherData(data))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debounceCity]);
}
