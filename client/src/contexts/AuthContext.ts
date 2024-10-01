import { createContext } from "react";

interface AuthContextType {
  auth:
    | {
        id?: number;
        name?: string;
        profile_picture?: string;
        role: string;
        selected_tags?: {
          id: number;
          name: string;
          icon: string;
          family: string;
        }[];
      }
    | undefined;
  setAuth: (
    auth:
      | {
          id?: number;
          name?: string;
          profile_picture?: string;
          role: string;
          selected_tags?: {
            id: number;
            name: string;
            icon: string;
            family: string;
          }[];
        }
      | undefined
  ) => void;
}

const defaultContextValue: AuthContextType = {
  auth: { role: "client" },
  setAuth: () => {},
};

export const AuthContext = createContext(defaultContextValue);
