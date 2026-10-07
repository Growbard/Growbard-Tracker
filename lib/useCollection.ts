"use client";

import { useCallback } from "react";
import { useStore } from "./store";
import type { AppData } from "./data";

/**
 * Returns an onEdit(rowId, key, raw) handler for a given collection in the
 * store. Numbers are parsed automatically; everything else is stored as text.
 * This is what powers inline editing on the table pages.
 */
export function useCollectionEditor<K extends keyof AppData>(collection: K) {
  const { setData } = useStore();
  return useCallback(
    (rowId: string, key: string, raw: string) => {
      setData((prev) => {
        const arr = prev[collection] as unknown as Array<Record<string, unknown>>;
        const next = arr.map((row) => {
          if (row.id !== rowId) return row;
          const current = row[key];
          const parsed =
            typeof current === "number" ? (isNaN(parseFloat(raw)) ? current : parseFloat(raw)) : raw;
          return { ...row, [key]: parsed };
        });
        return { ...prev, [collection]: next } as AppData;
      });
    },
    [collection, setData]
  );
}
