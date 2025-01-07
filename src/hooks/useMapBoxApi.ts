import { useState, useCallback, useEffect } from "react";
import useAxios from "./useAxios";

interface IUseMapboxAutocompleteProps {
    query: string;
    apiKey: string;
    types?: string;
    limit?: number;
    language?: string;
    country?: string;
}

export const useMapboxAutocomplete = (
  { query, apiKey , types = "address,place", limit = 10, language = "he-IL", country}: IUseMapboxAutocompleteProps
) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const { activate } = useAxios({
    manual: true,
    withCredentials: false,
    onSuccess: (response) => {
      console.log("API Success:", response);
      setSuggestions(response.data.features || []);
    },
    onError: (err) => {
      console.error("API Error:", err);
    },
  });

  const fetchSuggestions = useCallback(() => {
    if (!   query || !apiKey) {
      setSuggestions([]);
      return;
    }

    const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
    const encodedQuery = encodeURIComponent(query);

    const params = {
       types,
       limit,
       language,
       country
    };

    activate({
      url: `${baseUrl}/${encodedQuery}.json?access_token=${apiKey}`, params
    });
  }, [query, apiKey, activate]);

  useEffect(() => {
    if (query) {
        fetchSuggestions();
    }
  }, [query]);

  return suggestions;
};