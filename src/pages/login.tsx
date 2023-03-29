import { useRouter } from "next/router";
import { useState } from "react";
import ReactLoading from "react-loading";
import PageLayout from "../components/Layout";
import { useAuth } from "../contexts/auth";

export default function Login() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState<{
    identifier: string;
    password: string;
  }>({
    identifier: "",
    password: "",
  });

  const { login, loading, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target?.name]: e.target?.value,
    });
  };

  return (
    <PageLayout>
      <section className="bg-gray-900">
        <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign in to your account
              </h1>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <input
                  name="identifier"
                  id="identifier"
                  onChange={handleChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={() =>
                  login(loginCredentials.identifier, loginCredentials.password)
                }
                disabled={loading}
                className="flex flex-col items-center w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {!loading ? (
                  "Sign in"
                ) : (
                  <ReactLoading
                    className="text-center"
                    type={"bubbles"}
                    color={"white"}
                    height={"15px"}
                    width={"15px"}
                  />
                )}
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  onClick={() => router.push("/sign-up")}
                  className="font-medium hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
