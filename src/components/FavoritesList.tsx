import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <Typography variant="h6" mb={1}>Favorites</Typography>
      <List>
        {favorites.map(dog => (
          <ListItem key={dog.id} secondaryAction={
            <IconButton edge="end" onClick={() => removeFavorite(dog.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={dog.name} secondary={dog.breed} />
          </ListItem>
        ))}
      </List>
    </div>
  );
} 