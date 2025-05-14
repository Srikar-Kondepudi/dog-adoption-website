import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { Dog } from "../types";

export default function MatchModal({ open, onClose, match }: { open: boolean, onClose: () => void, match?: Dog }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your Match!</DialogTitle>
      <DialogContent>
        {match ? (
          <>
            <img src={match.img} alt={match.name} style={{ width: "100%", borderRadius: 8 }} />
            <Typography variant="h6">{match.name}</Typography>
            <Typography>Breed: {match.breed}</Typography>
            <Typography>Age: {match.age}</Typography>
            <Typography>Zip Code: {match.zip_code}</Typography>
          </>
        ) : (
          <Typography>No match found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 