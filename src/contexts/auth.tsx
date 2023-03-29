import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { SignUpBody } from "../pages/sign-up";
import api, {
  authenticate,
  createAccount,
  getMe,
  upload,
} from "../service/strapi";
import { setUserCookie, unsetCookie } from "../utils/cookie";

type UserDataType = {
  displayName?: string;
  username?: string;
  email?: string;
  country?: {
    code: string;
    name: string;
  };
  profilePhoto?: {
    url: string;
    format: {
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
};

type AuthContextData = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  register: ({
    email,
    username,
    displayName,
    password,
    country,
    profilePhoto,
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await authenticate({ identifier, password });
      setUserCookie(data);
      setLoading(false);
      router.push("/");
    } catch (e: any) {
      setLoading(false);
      processError(e);
    }
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
    profilePhoto,
  }: SignUpBody) => {
    setLoading(true);
    try {
      const uploaded = await upload(profilePhoto);
      const { data } = await createAccount({
        email,
        username,
        displayName,
        password,
        country,
        profilePhoto: uploaded?.data[0].id,
      });
      setUserCookie(data);
      setLoading(false);
      router.push("/");
    } catch (e: any) {
      setLoading(false);
      processError(e);
    }
  };

  useEffect(() => {
    async function loadUserFromCookie() {
      const token = getCookie("jwt");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUserName(getCookie("username")?.toString() ?? "");
        const { data } = await getMe();
        setMe(data);
        router.push("/");
      } else {
        if (router.pathname === "/") {
          router.push("/login");
        }
      }
    }
    loadUserFromCookie();
  }, [username, router, me]);

  return (
    <AuthContext.Provider
      value={{
        loading,
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

export const processError = (e: any) => {
  const errors = e.response.data;
  if (errors.error) {
    toast(errors.error.message);
  } else {
    toast("Something went wrong, please try again later.");
  }
};
