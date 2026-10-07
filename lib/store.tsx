"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { DashboardData, defaultData } from "./data";

const STORAGE_KEY = "growbard-dashboard-data-v1";

interface StoreContextValue {
  data: DashboardData;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  /** Update the entire data object */
  setData: (updater: (prev: DashboardData) => DashboardData) => void;
  /** Reset to the defaults shipped in lib/data.ts */
  reset: () => void;
  /** Export current data as a JSON string for download */
  exportJson: () => string;
  /** Import data from a JSON string */
  importJson: (json: string) => boolean;
  loaded: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<DashboardData>(defaultData);
  const [editMode, setEditMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // merge so new default keys appear even on old saved data
        setDataState({ ...defaultData, ...parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  // Persist on change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage might be unavailable (private mode) */
    }
  }, [data, loaded]);

  const setData = useCallback(
    (updater: (prev: DashboardData) => DashboardData) => {
      setDataState((prev) => updater(prev));
    },
    []
  );

  const reset = useCallback(() => {
    setDataState(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const importJson = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setDataState({ ...defaultData, ...parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{
        data,
        editMode,
        setEditMode,
        setData,
        reset,
        exportJson,
        importJson,
        loaded,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
