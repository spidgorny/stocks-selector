import { Stack } from "react-bootstrap";
import React from "react";

export function Diff({ now, vs }) {
  const diff = now - vs;
  return (
    <span className={diff >= 0 ? "text-success" : "text-danger"}>
      {diff > 0 ? "+" : ""}
      {diff.toFixed(2)}
    </span>
  );
}

export function HStack({ children }) {
  return (
    <Stack className="w-100 justify-content-between flex-row">{children}</Stack>
  );
}
