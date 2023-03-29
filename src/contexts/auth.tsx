import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import api, { authenticate } from "../service/strapi";
import { setUserCookie, unsetCookie } from "../utils/cookie";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  user: {
    username: string;
  };
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUserName] = useState<string>("");
  const router = useRouter();

  const login = async (identifier: string, password: string) => {
    const { data } = await authenticate({ identifier, password });
    setUserCookie(data);
    router.push("/");
  };

  const logout = () => {
    unsetCookie();
    api.defaults.headers.Authorization = "";
    router.reload();
  };

  const register = async () => {};

  useEffect(() => {
    function loadUserFromCookie() {
      const token = getCookie("jwt");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUserName(getCookie("username")?.toString() ?? "");
      } else {
        router.push("/login");
      }
    }
    loadUserFromCookie();
  }, [username, router]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: username !== "",
        login,
        logout,
        user: { username },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
