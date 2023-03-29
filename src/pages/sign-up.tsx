import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import PageLayout from "../components/Layout";
import { useAuth } from "../contexts/auth";
import { upload } from "../service/strapi";

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
  country?: {
    code: string;
    name: string;
  };
  displayName: string;
  profilePhoto?: File | string;
};

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [registerData, setRegisterData] = useState<SignUpBody>({
    username: "",
    email: "",
    password: "",
    displayName: "",
    country: {
      code: "",
      name: "",
    },
  });
  const options = useMemo(() => countryList().getData(), []);

  const handleChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files[0] : null;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener(
        "load",
        () => {
          setPhoto(fileReader.result);
        },
        false
      );
      setRegisterData({ ...registerData, profilePhoto: files });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "country") {
      setRegisterData({
        ...registerData,
        country: {
          code: e.target.value,
          name:
            options.find((option) => option.value === e.target.value)?.label ??
            "",
        },
      });
    } else {
      setRegisterData({
        ...registerData,
        [e.target?.name]: e.target?.value,
      });
    }
  };

  return (
    <PageLayout>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign up
              </h1>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  onChange={handleChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="user@mail.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Dislay name
                </label>
                <input
                  name="displayName"
                  id="displayName"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Select your country
                </label>
                <select
                  defaultValue=""
                  name="country"
                  onChange={handleChange}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    -
                  </option>
                  {options.map((e, index) => (
                    <option key={index} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-center w-full">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Profile photo
                </label>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent"
                >
                  <div className="flex flex-col items-center justify-center">
                    {photo ? (
                      <div className="flex flex-col items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-14 h-14 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                          src={photo as string}
                          alt="profilePhoto"
                        />
                        <p className="mb-2 text-sm text-white">
                          <span className="font-semibold">
                            Click to upload another photo
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="mb-2 text-sm text-white">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    )}
                  </div>
                  <input
                    onChange={handleChangePhoto}
                    accept="image/png, image/gif, image/jpeg"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={() => register(registerData)}
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
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
