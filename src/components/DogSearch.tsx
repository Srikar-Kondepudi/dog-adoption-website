import { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, Grid, CircularProgress } from "@mui/material";
import api from "../api/fetchApi";
import DogCard from "./DogCard";
import FavoritesList from "./FavoritesList";
import MatchModal from "./MatchModal";
import Pagination from "./Pagination";
import { useFavorites } from "../context/FavoritesContext";
import type { Dog } from "../types";
import { useAuth } from "../context/AuthContext";

type SearchResult = {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
};

export default function DogSearch() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<Dog | undefined>();
  const [matchOpen, setMatchOpen] = useState(false);
  const { favorites, clearFavorites } = useFavorites();
  const { setAuthenticated } = useAuth();

  // Fetch breeds
  useEffect(() => {
    api.get("/dogs/breeds").then(res => setBreeds(res.data)).catch(() => {});
  }, []);

  // Fetch dogs by IDs
  useEffect(() => {
    if (!searchResult?.resultIds?.length) {
      setDogs([]);
      return;
    }
    setLoading(true);
    api.post("/dogs", searchResult.resultIds.slice(0, 25))
      .then(res => setDogs(res.data))
      .finally(() => setLoading(false));
  }, [searchResult]);

  // Initial search
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [selectedBreed, sortOrder]);

  function handleSearch(query?: string) {
    setLoading(true);
    let url = "/dogs/search?";
    if (selectedBreed) url += `breeds=${selectedBreed}&`;
    url += `sort=breed:${sortOrder}`;
    if (query) url = query;
    api.get(url)
      .then(res => setSearchResult(res.data))
      .finally(() => setLoading(false));
  }

  function handleMatch() {
    if (!favorites.length) return;
    api.post("/dogs/match", favorites.map(d => d.id))
      .then(res => {
        const matchId = res.data.match;
        api.post("/dogs", [matchId]).then(r => {
          setMatch(r.data[0]);
          setMatchOpen(true);
          clearFavorites();
        });
      });
  }

  function handleLogout() {
    api.post("/auth/logout").then(() => setAuthenticated(false));
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" mb={2}>Find Your Dog!</Typography>
        <Button onClick={handleLogout} color="secondary" variant="outlined">Logout</Button>
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Breed</InputLabel>
          <Select value={selectedBreed} label="Breed" onChange={e => setSelectedBreed(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {breeds.map(breed => <MenuItem key={breed} value={breed}>{breed}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by Breed</InputLabel>
          <Select value={sortOrder} label="Sort by Breed" onChange={e => setSortOrder(e.target.value as "asc" | "desc")}> 
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => handleSearch()}>Search</Button>
      </Box>
      <Box display="flex" gap={4}>
        <Box flex={3}>
          {loading ? <CircularProgress /> : (
            <Grid container>
              {dogs.map(dog => <DogCard key={dog.id} dog={dog} />)}
            </Grid>
          )}
          <Pagination
            onPrev={() => handleSearch(searchResult?.prev)}
            onNext={() => handleSearch(searchResult?.next)}
            hasPrev={!!searchResult?.prev}
            hasNext={!!searchResult?.next}
          />
        </Box>
        <Box flex={1}>
          <FavoritesList />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={!favorites.length}
            onClick={handleMatch}
          >
            Find My Match!
          </Button>
        </Box>
      </Box>
      <MatchModal open={matchOpen} onClose={() => setMatchOpen(false)} match={match} />
    </Box>
  );
} 