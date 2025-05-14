import React, { createContext, useContext, useState } from "react";
import type { Dog } from "../types";

type FavoritesContextType = {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const addFavorite = (dog: Dog) => setFavorites((prev) => prev.find(d => d.id === dog.id) ? prev : [...prev, dog]);
  const removeFavorite = (id: string) => setFavorites((prev) => prev.filter(d => d.id !== id));
  const clearFavorites = () => setFavorites([]);
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}; 