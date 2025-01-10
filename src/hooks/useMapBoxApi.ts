import { useEffect, useState, useCallback } from "react";
import useAxios from "./useAxios";

interface IUseMapboxAutocompleteProps {
  query: string;
  apiKey: string;
}

export const useMapboxAutocomplete = ({
  query,
  apiKey,
}: IUseMapboxAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { activate } = useAxios({
    manual: true,
    onSuccess: (response) => {
      const features = response.data?.features || [];
      setSuggestions(features);
      console.log("Suggestions:", features);
    },
    onError: (error) => {
      console.error("Error fetching suggestions:", error);
    },
  });

  const fetchSuggestions = useCallback(() => {
    if (!query || !apiKey) {
      setSuggestions([]);
      console.warn("Query or API key missing!");
      return;
    }

    activate({
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&key=AIzaSyAjzGZTVQR_AEqXMKKOwpLDL0U7pKxNJRA`,
    });
  }, [query, apiKey, activate]);

  useEffect(() => {
    fetchSuggestions();
  }, [query, fetchSuggestions]);

  return suggestions;
};
