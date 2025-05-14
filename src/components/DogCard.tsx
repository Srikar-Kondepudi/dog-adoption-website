import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import type { Dog } from "../types";
import { useFavorites } from "../context/FavoritesContext";

export default function DogCard({ dog }: { dog: Dog }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFav = favorites.some(d => d.id === dog.id);

  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia component="img" height="200" image={dog.img} alt={dog.name} />
      <CardContent>
        <Typography variant="h6">{dog.name}</Typography>
        <Typography variant="body2">Breed: {dog.breed}</Typography>
        <Typography variant="body2">Age: {dog.age}</Typography>
        <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color={isFav ? "secondary" : "primary"}
          onClick={() => isFav ? removeFavorite(dog.id) : addFavorite(dog)}
        >
          {isFav ? "Remove Favorite" : "Add Favorite"}
        </Button>
      </CardActions>
    </Card>
  );
} 