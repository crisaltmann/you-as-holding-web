import Holding from "../Holding";
import Insights from "../Insights";
import Wallet from "../Wallet";
import Header from "../../components/Header";

export const Main = () => {
  return (
    <>
      <Header />
      <Wallet />
      <Holding />
      <Insights />
    </>
  );
};
