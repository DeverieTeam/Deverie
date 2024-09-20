import { createContext } from "react";

interface AuthContextType {
  auth:
    | { id?: number; name?: string; profile_picture?: string; role: string }
    | undefined;
  setAuth: (
    auth:
      | {
          id?: number;
          name?: string;
          profile_picture?: string;
          role: string;
        }
      | undefined
  ) => void;
}

const defaultContextValue: AuthContextType = {
  auth: { role: "client" },
  setAuth: () => {},
};

export const AuthContext = createContext(defaultContextValue);
