import { Inter } from "next/font/google";
import PageLayout from "../components/Layout";
import { useAuth } from "../contexts/auth";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isAuthenticated, logout, user, me } = useAuth();

  if (!isAuthenticated) {
    return;
  }

  return (
    <PageLayout>
      <section className="bg-gray-900">
        <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl leading-tight tracking-tight md:text-2xl text-white">
                Logged in as
              </h1>
              <div className="flex flex-col items-center text-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-full h-32 w-32"
                  src={
                    me.profilePhoto
                      ? me.profilePhoto.url
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  }
                  alt="profile"
                />
                <h1 className="text-xl leading-tight tracking-tight md:text-2xl text-white">
                  {me.displayName}@<strong>{me.username}</strong>
                  <br />
                  from {me.country?.name}{" "}
                  {getUnicodeFlagIcon(me.country?.code ?? "US")}
                </h1>
              </div>
              <button
                type="submit"
                onClick={logout}
                className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
