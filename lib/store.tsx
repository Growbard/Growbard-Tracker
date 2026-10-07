"use client";

import React, {
  createContext, useContext, useEffect, useRef, useState, useCallback,
} from "react";
import { DashboardData, defaultData } from "./data";

const STORAGE_KEY = "growbard-dashboard-data-v1";

export type SyncState = "local" | "loading" | "synced" | "saving" | "offline";

interface StoreContextValue {
  data: DashboardData;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  setData: (updater: (prev: DashboardData) => DashboardData) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (json: string) => boolean;
  loaded: boolean;
  sync: SyncState;
  /** true once we know the server has a shared store available */
  shared: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<DashboardData>(defaultData);
  const [editMode, setEditMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sync, setSync] = useState<SyncState>("loading");
  const [shared, setShared] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didInitialSave = useRef(false);

  // Initial load: localStorage first (instant), then shared server (authoritative).
  useEffect(() => {
    let cached: DashboardData | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) cached = { ...defaultData, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    if (cached) setDataState(cached);

    (async () => {
      try {
        const res = await fetch("/api/data", { cache: "no-store" });
        const json = await res.json();
        if (json.shared) setShared(true);
        if (json.data) {
          setDataState({ ...defaultData, ...json.data });
          setSync("synced");
        } else if (json.shared) {
          // shared store exists but is empty -> seed it with what we have
          setSync("synced");
          didInitialSave.current = true;
          void saveToServer(cached ?? defaultData);
        } else {
          setSync("local");
        }
      } catch {
        setSync(cached ? "offline" : "local");
      } finally {
        setLoaded(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToServer = useCallback(async (payload: DashboardData) => {
    try {
      setSync("saving");
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setSync(json.ok ? "synced" : json.shared === false ? "local" : "offline");
      if (json.shared) setShared(true);
    } catch {
      setSync("offline");
    }
  }, []);

  // Persist on change: localStorage immediately, server debounced.
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }

    if (shared) {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => void saveToServer(data), 700);
    }
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [data, loaded, shared, saveToServer]);

  const setData = useCallback(
    (updater: (prev: DashboardData) => DashboardData) => setDataState((p) => updater(p)),
    []
  );

  const reset = useCallback(() => {
    setDataState(defaultData);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    if (shared) void saveToServer(defaultData);
  }, [shared, saveToServer]);

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data]);
  const importJson = useCallback((json: string) => {
    try { setDataState({ ...defaultData, ...JSON.parse(json) }); return true; }
    catch { return false; }
  }, []);

  return (
    <StoreContext.Provider value={{
      data, editMode, setEditMode, setData, reset, exportJson, importJson, loaded, sync, shared,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
