import { Stack } from "react-bootstrap";
import React, { ReactNode } from "react";
import { Money } from "./symbol-info";

export function Diff({ now, vs }: { now: number; vs: number }) {
  const diff = vs - now;
  return (
    <span className={diff >= 0 ? "text-success" : "text-danger"}>
      {diff > 0 ? "+" : ""}
      {diff.toFixed(2)}
    </span>
  );
}

export function HStack({ children }: { children: ReactNode }) {
  return (
    <Stack className="w-100 justify-content-between flex-row">{children}</Stack>
  );
}
