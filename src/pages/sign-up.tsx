import { useRouter } from "next/router";
import { useState } from "react";
import PageLayout from "../components/Layout";

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [data, setData] = useState<SignUpBody>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <PageLayout>
      <section className="bg-gray-900">
        <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Dislay name
                  </label>
                  <input
                    name="username"
                    id="username"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Display name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Username
                  </label>
                  <input
                    name="username"
                    id="username"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 my-3 text-center"
                >
                  Create account
                </button>
                <p className="text-sm font-light text-gray-400">
                  Have an account?{" "}
                  <a
                    onClick={() => router.push("/login")}
                    className="font-medium hover:underline text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
