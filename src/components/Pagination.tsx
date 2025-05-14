import React from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function Pagination({ onPrev, onNext, hasPrev, hasNext }: {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <ButtonGroup sx={{ my: 2 }}>
      <Button onClick={onPrev} disabled={!hasPrev}>Previous</Button>
      <Button onClick={onNext} disabled={!hasNext}>Next</Button>
    </ButtonGroup>
  );
} 