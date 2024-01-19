import { axios } from "@/axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const getStaticProps = async () => {
  return {
    props: {
      data: "home",
    },
  };
};

export default function Login(props: any) {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    axios
      .post("/login", {
        NIK: nik,
        password: password,
      })
      .then(() => {})
      .catch(() => {});
  };

  const { push } = useRouter();

  return (
    <>
      <button onClick={() => push("/")}>Home</button>
      <input type="text" onChange={(e) => setNik(e.target.value)} value={nik} />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLoginClick}>Login</button>
      <p>Login Page</p>
    </>
  );
}
