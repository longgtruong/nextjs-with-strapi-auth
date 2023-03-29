import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/auth";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 500,
        }}
      />
    </AuthProvider>
  );
}
