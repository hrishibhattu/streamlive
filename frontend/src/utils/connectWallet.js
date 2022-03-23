import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerProvider from "burner-provider";
import { Web3Provider } from "@ethersproject/providers";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";

const INFURA_ID = "c1f9c3f1c72b4544a235a8b2b52ff558";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "c1f9c3f1c72b4544a235a8b2b52ff558",
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_B327F8B12CA09A34",
      },
    },
    torus: {
      package: Torus,
    },
  },
});

export const logoutWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

export const getWalletProvider = async () => {
  const web3Modalprovider = await web3Modal.connect();
  const provider = new Web3Provider(web3Modalprovider);
  return provider;
};

export const getLocalProvider = () => {
  return new Web3Provider(
    new BurnerProvider("https://rinkeby.infura.io/v3/" + INFURA_ID)
  );
};
