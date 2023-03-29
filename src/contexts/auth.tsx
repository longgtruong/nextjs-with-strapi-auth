import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { SignUpBody } from "../pages/sign-up";
import api, { authenticate, createAccount, getMe } from "../service/strapi";
import { setUserCookie, unsetCookie } from "../utils/cookie";

type UserDataType = {
  displayName?: string;
  username?: string;
  email?: string;
  country?: {
    code: string;
    name: string;
  };
};

type AuthContextData = {
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  register: ({
    email,
    username,
    displayName,
    password,
    country,
  }: SignUpBody) => Promise<void>;
  user: {
    username: string;
  };
  me: UserDataType;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUserName] = useState<string>("");
  const [me, setMe] = useState({});
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

  const register = async ({
    email,
    username,
    displayName,
    password,
    country,
  }: SignUpBody) => {
    const { data } = await createAccount({
      email,
      username,
      displayName,
      password,
      country,
    });
    setUserCookie(data);
    router.push("/");
  };

  useEffect(() => {
    async function loadUserFromCookie() {
      const token = getCookie("jwt");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUserName(getCookie("username")?.toString() ?? "");
        const { data } = await getMe();
        setMe(data);
      } else {
        if (router.pathname === "/") {
          router.push("/login");
        }
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
        register,
        user: { username },
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
