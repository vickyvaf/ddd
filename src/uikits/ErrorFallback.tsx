// import { axios } from "@/utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const UNPROTECTED_ROUTES = ["/login", "/forget-password", "/reset-password"];

export function ErrorFallback({ error, resetErrorBoundary }: any) {
  const [isLogout, setIsLogout] = useState(false);

  const router = useRouter();

  const isInLoginPage = UNPROTECTED_ROUTES.includes(router.pathname);

  const clearData = useCallback(() => {
    // Clear cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Clear local storage
    localStorage.clear();

    // Optionally, you can also clear session storage if needed
    sessionStorage.clear();

    // reload after clear all data
    location.reload();

    if (UNPROTECTED_ROUTES.includes(router.pathname)) return;

    setIsLogout(true);
    axios
      .post(`/logout`)
      .then(() => router.reload())
      .catch(() => {})
      .finally(() => setIsLogout(false));
  }, []);

  return (
    <div
      role="alert"
      className="w-full h-screen flex flex-col justify-center items-center"
    >
      <img src="/icons/error.svg" />

      <p>Something went wrong</p>

      <pre className="text-red-500 text-sm">{error?.message}</pre>

      <div className="flex items-center gap-3 mt-10">
        <button onClick={() => router.reload()} disabled={isLogout}>
          Try again
        </button>

        <button onClick={clearData} disabled={isLogout}>
          Clear all data
        </button>

        {!UNPROTECTED_ROUTES.includes(router.pathname) ? (
          <button onClick={clearData} disabled={isLogout}>
            Log out
          </button>
        ) : null}
      </div>
    </div>
  );
}
