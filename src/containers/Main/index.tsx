import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Holding from "../Holding";
import Insights from "../Insights";
import Wallet from "../Wallet";

export const Main = () => {
  const history = useHistory();
  const [userId, setUserId] = useState<number>(0);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    const id_usuario = localStorage.getItem("id_usuario") || "0";

    if (!token) {
      history.push("/login");
    }

    setToken(token);
    setUserId(parseInt(id_usuario));
  }, [history]);

  return (
    <>
      {token && (
        <>
          <Header />
          <Wallet userId={userId} />
          <Holding userId={userId} />
          <Insights userId={userId} />
        </>
      )}
    </>
  );
};
