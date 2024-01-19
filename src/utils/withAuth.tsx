// import dayjs from "dayjs";
// import { ServerResponse } from "http";
// import jwt from "jsonwebtoken";

// export const redirect = (res: ServerResponse, location: string) => {
//   res?.writeHead(302, { Location: location });
//   res?.end();
// };

// export const withAuth = (Component: any) => {
//   return function (props: { token: string; isAuthenticated: boolean }) {
//     let pageProps = {
//       ...props,
//     };

//     const decoded: any = jwt.decode(props.token);

//     const expirationTime = dayjs.unix(decoded?.exp);

//     if (dayjs().isBefore(expirationTime)) {
//       pageProps = {
//         ...props,
//         isAuthenticated: true,
//       };
//     }

//     if (decoded) {
//       pageProps = {
//         ...props,
//         isAuthenticated: true,
//       };
//     }

//     console.log("mewProps: ", pageProps);

//     return <Component {...pageProps} />;
//   };
// };
