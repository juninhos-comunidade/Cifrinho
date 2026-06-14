"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface Preferences {
  businessEnabled: boolean;
  setBusinessEnabled: (v: boolean) => void;
}

const PreferencesContext = createContext<Preferences>({
  businessEnabled: true,
  setBusinessEnabled: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [businessEnabled, setBusinessEnabledState] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cif.businessEnabled");
      if (stored !== null) setBusinessEnabledState(stored === "true");
    } catch {}
  }, []);

  function setBusinessEnabled(v: boolean) {
    setBusinessEnabledState(v);
    try {
      localStorage.setItem("cif.businessEnabled", String(v));
    } catch {}
  }

  return (
    <PreferencesContext.Provider
      value={{ businessEnabled, setBusinessEnabled }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
