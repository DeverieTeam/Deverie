import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

export default function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<
    | {
        id?: number;
        name?: string;
        profile_picture?: string;
        role: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (auth === undefined) {
      const cookies = new Cookies(null, {
        path: "/",
      });
      const jwt = cookies.get("JWT");
      let expired = false;
      if (jwt) {
        const decodedJwt: { id: number; iat: number } = jwtDecode(jwt);
        const memberId = decodedJwt.id;
        fetch(`http://localhost:3000/member/${memberId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              expired = true;
            }
            return response.json();
          })
          .then((data) => {
            if (!expired) {
              setAuth(data);
            } else {
              setAuth({ role: "client" });
            }
          });
      } else {
        setAuth({ role: "client" });
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

type Props = {
  children: React.ReactNode;
};
