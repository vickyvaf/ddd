import "@/styles/globals.css";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type PageProps = {
  projects: { value: number; label: string }[];
  token: string | undefined;
  isAuthenticated: boolean;
};

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const UNPROTECTED_ROUTES = ["/login", "/reset-password", "/forgot-password"];

const ProtectedPage = ({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: PageProps;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!pageProps.isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
      setTimeout(() => {
        push("/login");
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [pageProps]);

  if (isLoading) {
    return <span className="loader" />;
  }

  return children;
};

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();

  // if (!pageProps.isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
  //   return (
  //     <>
  //       <h1>401 - Token expired</h1>
  //       <button onClick={() => push("/login")}>Login</button>
  //     </>
  //   );
  // }

  return (
    <ProtectedPage
      children={<Component {...pageProps} />}
      pageProps={pageProps}
    />
  );
}

App.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {
    token: TOKEN,
    isAuthenticated: true,
  };

  const decoded: any = jwt.decode(pageProps.token);

  const expirationTime = dayjs.unix(decoded?.exp);

  if (dayjs().isBefore(expirationTime) && decoded) {
    pageProps = {
      ...pageProps,
      isAuthenticated: true,
    };
  }

  return { pageProps };
};
